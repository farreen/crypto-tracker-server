// CREATE JWT TOKEN
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { ACCESS_TOKEN_KEY } = process.env;
const { REFRESH_TOKEN_KEY } = process.env;
const accessTokenMaxAge = process.env.ACCESS_TOKEN_MAX_AGE
const refreshTokenMaxAge = process.env.REFRESH_TOKEN_MAX_AGE

export const createAccessToken = (id) => {
    const secretKey = ACCESS_TOKEN_KEY;
    return jwt.sign({ id }, secretKey, {
        expiresIn: accessTokenMaxAge
    })
}

export const createRefreshToken = (id) => {
    const secretKey = REFRESH_TOKEN_KEY;
    return jwt.sign({ id }, secretKey, { expiresIn: refreshTokenMaxAge })
}

