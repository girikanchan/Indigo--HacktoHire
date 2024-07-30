import { Router, Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
import config from '../../config';

const SECRET_KEY = config.SECRET_KEY;

export async function auth(req: Request, res: Response, next: NextFunction) {

    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            let userId = (req as any).userId = user.id;
            console.log("userId", userId);
        } else {
            res.status(401).json({ message: "Unauthorized user" });
            return;
        }

        next();
    } catch (err:any) {
        res.status(401).json({ message: "Unauthorized user" });
    }
};