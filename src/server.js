import { app } from "./app.js";
import { sequelize } from "./models/index.js";

import { socketIO } from "./services/socketIO/index.js";
import http from "http";

const port = process.env.PORT || 8001;
const httpServer = http.createServer(app);

socketIO.attach(httpServer, {
  cors: {
    origin: ["*"],
    credentials: true,
  },
});

sequelize
  .sync({
    //force: true
    // alter: true,
  })
  .then(() => {
    httpServer.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log("listening on port " + port);
    });
  });
