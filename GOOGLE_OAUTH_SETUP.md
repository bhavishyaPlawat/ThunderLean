# Google OAuth Setup Guide

## Environment Variables Required

### Backend (.env file in Backend directory)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/thunderlean

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_here

# Server Configuration
PORT=8080
NODE_ENV=development
```

### Frontend (.env file in frontend directory)
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## Google OAuth Setup Steps

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select an existing one
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `http://localhost:5173` (for Vite dev server)
   - Add authorized redirect URIs:
     - `http://localhost:3000` (for development)
     - `http://localhost:5173` (for Vite dev server)
5. **Copy the Client ID** and add it to both backend and frontend .env files

## Testing the Implementation

1. Start the backend server: `cd Backend && npm run dev`
2. Start the frontend: `cd frontend && npm run dev`
3. Navigate to the login page and try the "Sign in with Google" button
4. The Google OAuth popup should appear and allow you to sign in

## Troubleshooting

- Make sure both .env files have the same GOOGLE_CLIENT_ID
- Ensure the Google OAuth credentials are properly configured in Google Cloud Console
- Check browser console for any JavaScript errors
- Verify that the backend server is running and accessible
