import { verify } from "jsonwebtoken"
import {serialize} from 'cookie'

export default function handler(req, res) {

    const {myTokenName} = req.cookies

    if (!myTokenName) {
        return res.status(401).json({message: 'Not authorized'})
    }

    try {
        verify(myTokenName, 'secret')
        const serialized = serialize('myTokenName', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/',
        })
        res.setHeader('Set-Cookie', serialized)
        return res.status(200).json({message: 'Logout success'})
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'})
    }
}