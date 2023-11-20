import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';

const generateToken = (req: Request, res: Response, next: NextFunction) => {
    res.locals.token = global.serverToken;

    next();
};

export default generateToken;
