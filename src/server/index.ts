import express from "express";
import bodyParser from "body-parser";
import searchRoutes from "./routes/search.routes";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', searchRoutes);

export default app;
