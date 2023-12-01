import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const generateToken = (req: Request, res: Response, next: NextFunction) => {
  if (!global.serverToken) {
    const sessionId = uuidv4();
    const token = jwt.sign({ sessionId }, 'secretToken', { expiresIn: '4h' });
    global.serverToken = token;
  }

  const sessionId = jwt.verify(global.serverToken, 'secretToken').sessionId;

  res.locals.token = {
    sessionId,
    jwt: global.serverToken,
  };

  next();
};

export default generateToken;
