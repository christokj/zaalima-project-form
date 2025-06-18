import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../models/User';
import { ENV } from '../config/env';
import { Types } from 'mongoose';

// Types for JWT payload
interface JwtPayload {
    userId: string | Types.ObjectId;
}

// Signup
export const signUp = async (req: Request, res: Response): Promise<void> => {
    const { username, name, age, mobile, password } = req.body;
    try {
        const existing = await User.findOne({ username });
        if (existing) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, name, age, mobile, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    console.log("first ")
    try {
        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).json({ message: 'Invalid username or password' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid username or password' });
            return;
        }

        const accessToken = jwt.sign({ userId: user._id }, ENV.ACCESS_TOKEN_SECRET, { expiresIn: '5m', algorithm: 'HS256' });
        const refreshToken = jwt.sign({ userId: user._id }, ENV.REFRESH_TOKEN_SECRET, { expiresIn: '1d', algorithm: 'HS256' });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ accessToken, username, message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Refresh Token
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies?.refreshToken;
    if (!token) {
        res.status(401).json({ message: 'No refresh token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, ENV.REFRESH_TOKEN_SECRET) as JwtPayload;
        const accessToken = jwt.sign({ userId: decoded.userId }, ENV.ACCESS_TOKEN_SECRET, { expiresIn: '5m', algorithm: 'HS256' });
        res.status(200).json({ accessToken });
    } catch (err) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,      // only if using HTTPS
        sameSite: 'none'   // if frontend is on different domain
    });
    res.status(200).json({ message: 'Logout successful' });
};

export const getDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.find();
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
