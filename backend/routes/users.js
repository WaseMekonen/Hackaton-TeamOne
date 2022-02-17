const router = require("express").Router()
const { getUser, insertNewLineToUserFavorites,
    deleteLineFromUserFavorites,
    insertNewUser
} = require("../controllers/users");

router.get('/:localId', (req, res) => {
    getUser(req, res);
});

router.patch("/:localId", (req, res) => {
    insertNewLineToUserFavorites(req, res);
});

router.patch('/delete/:localId', (req, res) => {
    deleteLineFromUserFavorites(req, res);
});

router.post('/', (req, res) => {
    insertNewUser(req, res);
});

module.exports = router;