const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb+srv://iyerk570:<TGUWOFbBgMPAY6Wb>@cluster0.yqorw95.mongodb.net/';

mongoose.connect(MONGO_URI)
.then(() => console.log('Successfully connected to MongoDB.'))
.catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
});

// --- 3. ROUTES ---

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('API endpoints are now available under http://localhost:3000/api/auth');
});
