const router = require("express").Router();
const { getLine, getLines } = require('../controllers/lines');

router.get("", (req, res) => {
    getLines(res);
});

router.get("/:busLine", (req, res) => {
    getLine(res, req);
});

module.exports = router;