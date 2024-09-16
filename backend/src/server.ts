import mongoose from "mongoose";

import app from "./app";
import { MONGO_URI, PORT } from "./config";
console.log(`MONGO_URI : ${MONGO_URI}`);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
