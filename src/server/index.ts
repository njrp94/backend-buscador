import express from "express";
import bodyParser from "body-parser";
import searchRoutes from "./routes/search.routes";
import userRoutes from "./routes/user.routes"
//import generateToken from '../middlewares/token.middleware';
import cors from 'cors';
import * as jwt from 'jsonwebtoken'; 
import { v4 as uuidv4 } from 'uuid';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

const sessionId = uuidv4();
const serverToken = jwt.sign({ sessionId }, 'secretToken', { expiresIn: '4h' });

global.serverToken = serverToken;

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(generateToken);
app.use('/api/v1', searchRoutes);
app.use('/api/v1', userRoutes);

export default app;
