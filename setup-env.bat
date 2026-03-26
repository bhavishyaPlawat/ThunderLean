@echo off
echo Setting up environment files...

echo Creating Backend .env file...
echo MONGODB_URI=mongodb://localhost:27017/thunderlean > Backend\.env
echo JWT_SECRET=your_jwt_secret_key_here >> Backend\.env
echo GOOGLE_CLIENT_ID=461409972005-e3jfhdjftjnh90ukvlekqj2tr0oj1q1n.apps.googleusercontent.com >> Backend\.env
echo PORT=8080 >> Backend\.env
echo NODE_ENV=development >> Backend\.env

echo Creating Frontend .env file...
echo VITE_API_BASE_URL=http://localhost:8080/api > frontend\.env
echo VITE_GOOGLE_CLIENT_ID=461409972005-e3jfhdjftjnh90ukvlekqj2tr0oj1q1n.apps.googleusercontent.com >> frontend\.env

echo Environment files created successfully!
echo.
echo IMPORTANT: You need to set up a JWT_SECRET in Backend\.env
echo Replace 'your_jwt_secret_key_here' with a secure random string
echo.
pause
