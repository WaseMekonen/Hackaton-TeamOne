const express = require("express"),
  app = express();
require("dotenv").config();
const { getLines, getUser, insertNewLineToUserFavorites } = require("./serverUtils");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/lines", (req, res) => {
  getLines(res);
});

app.get("/users/:localId", (req, res) => {
  getUser(res);
});

app.patch("/users/:id", (req, res) => {
  insertNewLineToUserFavorites(req, res);
})


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app is listening on PORT ${PORT}`);
});
