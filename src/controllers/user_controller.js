import bcrypt from 'bcrypt';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { generateOTP, sendOTP } from '../utils/otp.js';
import User from '../models/user.js';

export default class UserController {
    static async signin(req, res) {

    }

    static async signup(req, res) {
        try {
            // Get user input
            const { phoneNumber, password } = req.body;

            // Validate phone number and password
            if (!phoneNumber || !password) {
                return res.status(400).json({ message: 'Phone number and password are required.' });
            }

            // Validate phone number format (you can implement your own validation logic)
            if (!isValidPhoneNumber(phoneNumber)) {
                return res.status(400).json({ message: 'Invalid phone number format.' });
            }

            // Check if user already exist with the same phone number
            const oldUser = await User.findOne({ where: { phoneNumber: phoneNumber } });

            if (oldUser) {
                return res.status(409).json({ message: 'User already exist. Please signin' });
            }

            // Verify password length
            if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
            }

            // Generate OTP and send it (you need to implement these functions)
            const otp = generateOTP(); // Generate OTP
            const otpSent = await sendOTP(phoneNumber, otp); // Send OTP to the phone number

            if (!otpSent) {
                return res.status(500).json({ message: 'Failed to send OTP.' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user with the hashed password
            const newUser = await User.create({
                phoneNumber: phoneNumber,
                password: hashedPassword,
            });

            return res.status(201).json({ message: 'User created successfully.', userId: newUser.id });
        } catch (error) {
            console.error('Error in signup:', error);
            return res.status(500).json({ message: 'An error occurred while signing up.' });
        }
    }
}