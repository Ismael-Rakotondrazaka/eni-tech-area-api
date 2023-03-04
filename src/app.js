import express from "express";
import cors from "cors";

import { qrCodeRoutes } from "./routes/api/v1/qrcodes/index.js";
import { emailRoutes } from "./routes/api/v1/emails/index.js";
import { authRoutes } from "./routes/api/v1/auth/index.js";
import { studentFileRoutes } from "./routes/api/v1/studentFile/index.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { notFoundController } from "./controllers/routes/notFoundController.js";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

app.use("/api/v1/qrcodes", qrCodeRoutes);
app.use("/api/v1/emails", emailRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/studentFile", studentFileRoutes);

app.use("*", notFoundController);

app.use(errorMiddleware);

export { app };
