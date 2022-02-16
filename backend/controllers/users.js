const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
const objectId = mongoDB.ObjectId;
const url = process.env.MONGOURL;
const dbName = "esaybusy";


const getUser = (req, res) => {
    mongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const userId = req.params.id;
        const database = db.db(dbName);
        database
            .collection("users")
            .findOne({ _id: objectId(userId) }, (err, user) => {
                if (err) throw err;
                res.status(200).send(user);
                db.close();
            })

    })
}

const insertNewLineToUserFavorites = (req, res) => {
    mongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const userId = req.params.localId,
            userUpdatedList = req.body,
            database = db.db(dbName);
        database
            .collection('users')
            .findOneAndUpdate(
                { localId: userId },
                { $set: userUpdatedList },
                function (err, updatedFavorites) {
                    if (err) throw err
                    res.status(201).send(updatedFavorites);
                    db.close();
                }
            )
    })
}



function deleteLineFromUserFavorites(req, res) {
    mongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const userId = req.params.localId,
            userUpdatedList = req.body,
            database = db.db(dbName);
        database
            .collection('users')
            .findOneAndUpdate(
                { localId: userId },
                { $set: userUpdatedList },
                function (err, updatedFavorites) {
                    if (err) throw err
                    res.status(201).send(updatedFavorites);
                    db.close();
                }
            )
    })
}

function insertNewUser(req, res) {
    mongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const user = req.body;
        const database = db.db(dbName);
        database.collection('users').insertOne(user, (err, newUser) => {
            if (err) throw err;
            res.status(201).send(newUser);
            console.log({ user });
            db.close();
        });
    });
}

module.exports = {
    getUser,
    insertNewLineToUserFavorites,
    deleteLineFromUserFavorites,
    insertNewUser
}
