import app from "./app";
import { conectDB } from "./db";

conectDB();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("Api connected");
});

app.listen(PORT, () => {
  console.log(`Server runing in ${PORT}`);
});
