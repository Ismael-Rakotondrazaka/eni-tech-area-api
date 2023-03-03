import { app } from "./app.js";

const port = 8001;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("listening on port " + port);
});
