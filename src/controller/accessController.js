import UserModel from '../model/accessModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express'
import { createAccessToken, createRefreshToken } from '../middleware/auth.js';
const app = express();
dotenv.config();

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body.userData;
        if (username.length === 0 || email.length === 0 || password.length === 0) {
            res.status(400).send("cannot save blank data");
        } else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt)
            const user = await UserModel.create({ username, email, password: hashedPassword })
            const accessToken = createAccessToken(user._id);
            const refreshToken = createRefreshToken(user._id);
            res.status(201).json({ user, accessToken })
        }
    } catch (error) {
        console.log("Error", error)
        res.status(500).send(error.message);
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body.obj
        const user = await UserModel.findOne({ email })
        console.log("userLog", user);
        if (!user) {
            res.status(400).send("User doesnot exist");
        } else {
            const dbpassword = await bcrypt.compare(password, user.password)
            console.log("dbpassword", dbpassword);
            if (!dbpassword) {
                res.status(400).send("username and password doesnot exist");
            } else {
                const accessToken = createAccessToken(user._id);
                const refreshToken = createRefreshToken(user._id);
                res.status(200).json({ user, accessToken })
            }
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
}

