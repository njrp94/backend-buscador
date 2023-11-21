import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';

const generateToken = (req: Request, res: Response, next: NextFunction) => {
    const sessionId = uuidv4();
    const token = jwt.sign({ sessionId }, 'secretToken', { expiresIn: '4h' });

    res.locals.token = token;

    next();
};

export default generateToken;
