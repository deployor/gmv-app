import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { asyncHandler } from '../middleware/errorHandler';

export const microsoftLogin = asyncHandler(async (req: Request, res: Response) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    res.status(400).json({
      success: false,
      error: 'Access token is required',
    });
    return;
  }

// I BEG FOR THIS TO WORK.

  try {
    // Verify Microsoft token and get user info
    const microsoftUser = await AuthService.verifyMicrosoftToken(accessToken);
    
    // Find or create user in our database
    const user = await AuthService.findOrCreateUser(microsoftUser);
    
    // Generate JWT token
    const token = AuthService.generateToken(user);
    
    // Update last login
    await AuthService.updateLastLogin(user.id);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          displayName: user.displayName,
          role: user.role,
          profilePicture: user.profilePicture,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Microsoft login error:', error);
    res.status(401).json({
      success: false,
      error: 'Invalid Microsoft access token',
    });
  }
});

export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'User not authenticated',
    });
    return;
  }

  try {
    const user = await AuthService.getUserById(req.user.id);
    
    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user profile',
    });
  }
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  // For JWT-based auth, logout is handled on the client side
  // Here we can add token blacklisting if needed in the future
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
}); 