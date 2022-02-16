const router = require("express").Router()
const { getUser } = require("../controllers/users");

router.get("/:localId", (req, res) => {
    getUser(res);
});

router.patch("/:id", (req, res) => {
    insertNewLineToUserFavorites(req, res);
});

module.exports = router;