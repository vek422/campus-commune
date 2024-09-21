import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "@infrastructure/api/Routes";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(router);


export default app;
