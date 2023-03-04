import { app } from "./app.js";
import { sequelize } from "./models/index.js";

const port = 8001;

sequelize
  .sync({
    // alter: true,
  })
  .then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log("listening on port " + port);
    });
  });
