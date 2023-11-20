import express from "express";
import bodyParser from "body-parser";
import searchRoutes from "./routes/search.routes";
import userRoutes from "./routes/user.routes"
import generateToken from '../middlewares/token.middleware';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';


const app = express();

const sessionId = uuidv4();
const serverToken = jwt.sign({ sessionId }, 'secretToken', { expiresIn: '24h' });

global.serverToken = serverToken;

app.use(generateToken);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', searchRoutes);
app.use('/api/v1', userRoutes);

export default app;
