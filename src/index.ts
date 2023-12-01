import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./server";

dotenv.config({ path: ".env" });
const port = process.env.PORT
const connectionString = process.env.DB_CONNECTION;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.log("Error al conectar a la base de datos: ", error);
  });

app.listen(port, () => {
  console.log(`⚡️[server]: Server running at http://localhost:${port}`);
});
