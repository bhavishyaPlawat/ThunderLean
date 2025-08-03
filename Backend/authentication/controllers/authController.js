const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const User = require('../models/user');
const { sendOtpEmail } = require('../services/emailService');

const SALT_ROUNDS = 10;

exports.signup = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({ message: 'Email/phone and password are required.' });
        }

        const existingUser = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email or phone already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUserPayload = { password: hashedPassword };
        if (identifier.includes('@')) {
            newUserPayload.email = identifier;
        } else {
            newUserPayload.phone = identifier;
        }

        const user = new User(newUserPayload);
        await user.save();

        res.status(201).json({ message: 'User registered successfully!', userId: user._id });

    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
             return res.status(409).json({ message: 'User with this email or phone already exists.' });
        }
        res.status(500).json({ message: 'Server error during sign up.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({ message: 'Email/phone and password are required.' });
        }

        const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        res.status(200).json({ message: 'Login successful!', userId: user._id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { identifier } = req.body;

        if (!identifier) {
            return res.status(400).json({ message: 'Email or phone number is required.' });
        }

        const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save();

        if (user.email) {
            await sendOtpEmail(user.email, otp);
        } else if (user.phone) {
            console.log(`Sending OTP ${otp} to phone number ${user.phone} (mocked).`);
        }

        res.status(200).json({ message: 'OTP has been sent to your registered email/phone.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during forgot password process.' });
    }
};

exports.loginWithOtp = async (req, res) => {
    try {
        const { identifier, otp } = req.body;

        if (!identifier || !otp) {
            return res.status(400).json({ message: 'Identifier and OTP are required.' });
        }

        const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(401).json({ message: 'Invalid or expired OTP.' });
        }

        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.status(200).json({ message: 'OTP login successful!', userId: user._id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during OTP login.' });
    }
};
