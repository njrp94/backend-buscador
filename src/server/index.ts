import express from "express";
import bodyParser from "body-parser";
import searchRoutes from "./routes/search.routes";
import userRoutes from "./routes/user.routes"
import generateToken from '../middlewares/token.middleware';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(generateToken);
app.use('/api/v1', searchRoutes);
app.use('/api/v1', userRoutes);

export default app;
