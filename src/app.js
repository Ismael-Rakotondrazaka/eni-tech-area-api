import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { emailRoutes } from "./routes/api/v1/emails/index.js";
import { authRoutes } from "./routes/api/v1/auth/index.js";
import { userListFileRoutes } from "./routes/api/v1/userListFile/index.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { notFoundController } from "./controllers/routes/notFoundController.js";
import { questionRoutes } from "./routes/api/v1/questions/index.js";
import { userRoutes } from "./routes/api/v1/users/index.js";
import { notificationRoutes } from "./routes/api/v1/notifications/index.js";
import { challengeRoutes } from "./routes/api/v1/challenges/index.js";
import { eventRoutes } from "./routes/api/v1/events/index.js";
import { tagRoutes } from "./routes/api/v1/tags/index.js";
import { commentRoutes } from "./routes/api/v1/comments/index.js";
import { voteRoutes } from "./routes/api/v1/votes/index.js";
import { answerRoutes } from "./routes/api/v1/answers/index.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/v1/emails", emailRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/userlists", userListFileRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/answers", answerRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/votes", voteRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/challenges", challengeRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/tags", tagRoutes);

app.use("*", notFoundController);

app.use(errorMiddleware);

export { app };
