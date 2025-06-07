import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/edd',
  },
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'beans-istg-if-anyone-ever-uses-this-as-a-jwt-key-i-will-be-so-angry',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  
  // Microsoft Azure AD
  microsoft: {
    clientId: process.env.MICROSOFT_CLIENT_ID || '',
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET || '',
    tenantId: process.env.MICROSOFT_TENANT_ID || '',
    redirectUri: process.env.MICROSOFT_REDIRECT_URI || 'http://localhost:3001/api/auth/microsoft/callback',
  },
  
  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:19006'],
    credentials: true,
  },
  
  // File uploads
  uploads: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  },
  
  // School settings
  school: {
    name: process.env.SCHOOL_NAME || 'GMV',
    address: process.env.SCHOOL_ADDRESS || 'beans',
    phone: process.env.SCHOOL_PHONE || 'beans',
    email: process.env.SCHOOL_EMAIL || 'beans',
    website: process.env.SCHOOL_WEBSITE || 'beans',
    coordinates: {
      lat: parseFloat(process.env.SCHOOL_LAT || '40.7128'),
      lng: parseFloat(process.env.SCHOOL_LNG || '-74.0060'),
    },
  },
} as const;

// Validate required environment variables
export function validateConfig() {
  const required = ['DATABASE_URL', 'JWT_SECRET'];
  
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable add em dummy: ${key}`);
    }
  }
}

export default config; 