# GMV School App

A comprehensive mobile application for schools built with Expo React Native and Supabase.

## Features

- Authentication with email/password and Microsoft OAuth
- Dashboard with upcoming assignments, announcements, and courses
- Classes management
- Assignments tracking
- User profiles
- Real-time data with Supabase

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- Expo CLI: `npm install -g expo-cli`
- Supabase account (https://supabase.com)

### Environment Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL script from `scripts/supabase-schema.sql` in the SQL Editor in your Supabase project
3. In the Supabase Dashboard, go to Authentication > URL Configuration:
   - Add the following redirect URLs:
     - For development: `gmvschool://auth/callback`
     - For web: `https://your-app-url.com/auth/callback`
4. Enable the Microsoft OAuth provider:
   - Go to Authentication > Providers > Microsoft
   - Enable the provider
   - Add your Microsoft App Client ID and Secret
   - Set the redirect URL to `https://your-project-ref.supabase.co/auth/v1/callback`

### Running the App

For development:
```
npm start
```

To run on specific platforms:
```
npm run ios
npm run android
npm run web
```

## Project Structure

- `/app` - Main application screens
  - `/(auth)` - Authentication screens
  - `/(tabs)` - Main tab screens
- `/components` - Reusable UI components
- `/context` - React context providers
- `/lib` - Utility functions and services
- `/hooks` - Custom React hooks
- `/constants` - App constants and theme
- `/types` - TypeScript type definitions

## Database Schema

The app uses the following tables in Supabase:

- `profiles` - User profile data
- `classes` - School classes
- `enrollments` - Student enrollments in classes 
- `assignments` - Class assignments
- `submissions` - Assignment submissions
- `announcements` - School or class announcements

## Authentication Flow

1. Users can sign up/in with email and password
2. Microsoft OAuth authentication is available
3. On first sign-up, a profile record is automatically created
4. User session is persisted for convenience

## Adding Test Data

You can use the Supabase interface to add test data to your tables. Here's a recommended sequence:

1. Create a few profiles with different roles (student, teacher, admin)
2. Create classes taught by the teacher profiles
3. Create enrollments linking students to classes
4. Add assignments to classes
5. Add announcements

## Troubleshooting

- **Authentication Issues**: Ensure your redirect URLs are correctly set in both your app and Supabase
- **Database Errors**: Check that your SQL schema has been applied correctly
- **Environment Variables**: Verify that your `.env` file has the correct values

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
