const express = require("express"),
  app = express(),
  { getMovies } = require("serverUtils");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/movies", (req, res) => {
    getMovies(res)
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app is listening on PORT ${PORT}`);
});
