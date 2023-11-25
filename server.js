import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import playerRoute from "./routes/playerRoute.js";
import newsRoute from "./routes/newsRoute.js";
import teamsRoute from "./routes/teamsRoute.js";
import matchRoute from "./routes/matchRoute.js";
import leagueRoute from "./routes/leagueRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//config
dotenv.config();

//database
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//static
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/player", playerRoute);
app.use("/api/v1/news", newsRoute);
app.use("/api/v1/teams", teamsRoute);
app.use("/api/v1/match", matchRoute);
app.use("/api/v1/league", leagueRoute);

//rest api
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.bgCyan.white);
});
