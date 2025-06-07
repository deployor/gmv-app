import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AuthToken, AuthUser } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

//TODO: MAKE THIS SECURE- ;C
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access denied. No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as AuthToken;
    req.user = {
      id: decoded.userId,
      email: decoded.email
      lastName: '',
      role: decoded.role as any,
    };
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: 'Invalid token.',
    });
  }
};

// Middleware to check user roles
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions.',
      });
    }

    next();
  };
};

export const requireAdmin = requireRole(['admin']);

export const requireTeacherOrAdmin = requireRole(['teacher', 'admin']); 