import express from "express";
import cors from "cors";
import { env } from "./config/envConfig.js";
import apiRoutes from "./routes/index.routes.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/errorHandler.middleware.js";

const app = express();

app.use(
  cors({
    origin:
      env.frontendUrls.length > 0 ? env.frontendUrls : "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "5mb" }));

app.get("/", (_req, res) =>
  res.json({ name: "Kanvia API", status: "running" }),
);

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
});

export default app;
