import mongoose from "mongoose";
import http from "http"
import { initializeSocket } from "@infrastructure/socket";
import app from "./app";
import { MONGO_URI, PORT } from "./config";
import cors from "cors"

const server = http.createServer(app);
initializeSocket(server);

app.use(cors())
mongoose
  .connect(MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on PORT : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
