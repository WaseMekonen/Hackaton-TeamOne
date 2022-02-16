const express = require("express"),
  app = express();
require("dotenv").config();
const userRoutes = require("./routes/users");
const linesRoutes = require('./routes/lines')

app.use(express.json());

app.use("/users", userRoutes);

app.use("/lines", linesRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`app is listening on PORT ${PORT}`);
});
