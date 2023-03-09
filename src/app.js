import express from "express";
import cors from "cors";

import { qrCodeRoutes } from "./routes/api/v1/qrcodes/index.js";
import { emailRoutes } from "./routes/api/v1/emails/index.js";
import { authRoutes } from "./routes/api/v1/auth/index.js";
import { userListFileRoutes } from "./routes/api/v1/userListFile/index.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { notFoundController } from "./controllers/routes/notFoundController.js";
import { questionRoutes } from "./routes/api/v1/questions/index.js";
import { userRoutes } from "./routes/api/v1/users/index.js";
import { notificationRoutes } from "./routes/api/v1/notifications/index.js";
import { challengeRoutes } from "./routes/api/v1/challenges/index.js";
import { EventRouter } from "./routes/api/v1/events/index.js";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    // origin: ["*"],
    credentials: true,
  })
);

app.use("/api/v1/qrcodes", qrCodeRoutes);
app.use("/api/v1/emails", emailRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/userlists", userListFileRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/challenges", challengeRoutes);
//todo need to test
app.use("/api/v1/events",EventRouter)

app.use("*", notFoundController);

app.use(errorMiddleware);

export { app };
