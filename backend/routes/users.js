const router = require("express").Router()
const { getUser, insertNewLineToUserFavorites, 
    // deleteLineFromUserFavorites 
} = require("../controllers/users");


// localId
router.get("/:id", (req, res) => {
    getUser(req, res);
});

router.patch("/:localId", (req, res) => {
    insertNewLineToUserFavorites(req, res);
});

router.delete('/:id', (req, res) => {
    deleteLineFromUserFavorites(req, res);
})
module.exports = router;