const express = require("express"),
  app = express();
require("dotenv").config();
const { getLine, getLines } = require("./controllers/lines");
const { getUser, insertNewLineToUserFavorites } = require("./controllers/users");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/lines", (req, res) => {
  getLines(res);
});

app.get("/line/:busLine", (req, res) => {
  getLine(res, req);
});

app.get("/users/:localId", (req, res) => {
  getUser(res);
});

app.patch("/users/:id", (req, res) => {
  insertNewLineToUserFavorites(req, res);
})

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`app is listening on PORT ${PORT}`);
});
