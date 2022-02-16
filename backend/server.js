const express = require("express"),
app = express();
require ("dotenv").config();
const { getLines,getUser, getLine } = require("./serverUtils");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/lines", (req, res) => {
  getLines(res);
});

app.get("/line/:busLine", (req, res) => {
  getLine(res,req);
});

app.get("/users/:localId", (req, res) => {
  getUser(res);
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app is listening on PORT ${PORT}`);
});
