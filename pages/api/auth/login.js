import jwt from "jsonwebtoken";
import {serialize} from "cookie";

export default function loginHandler(req, res) {
    const {email, password} = req.body

     if (email === 'admin@local.com' && password === 'admin') {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            email: email,
            username: 'brayan'
        }, 'secret')

        const serialized = serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60,
        })
    
        res.setHeader('Set-Cookie', serialized)
        return res.json({message: 'Login success'})
    }

    return res.status(401).json({message: 'Login failed'})
}