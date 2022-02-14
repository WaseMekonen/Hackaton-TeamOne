const express = require("express"),
    app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello world");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`app is listening on PORT ${PORT}`);
});