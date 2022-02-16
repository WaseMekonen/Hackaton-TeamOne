const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
const objectId = mongoDB.ObjectId;
const url = process.env.MONGOURL;
const dbName = "esaybusy";

const getLines = (res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      console.log(err);
    }
    const database = db.db(dbName);
    database
      .collection("lines")
      .find({})
      .toArray(function (err, lines) {
        if (err) throw err;
        res.send(lines);
        console.log(lines);
        db.close();
      });
  });
};


const getUser = () => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      console.log(err);
    }
    const database = db.db(dbName);
    database
      .collection("users")
      .findOne({})
      .toArray(function (err, user) {
        if (err) throw err;
        console.log(user);
        db.close();
      });
  });
};

const insertNewLineToUserFavorites = (req, res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      throw err;
    }

    const userId = req.params.id,
      userUpdatedList = req.body,
      database = db.db(dbName);
    database.collection("users").findOneAndUpdate(
      { _id: objectId(userId) },
      { $set: userUpdatedList  },
      function (err, updatedFavorites) {
        if (err) {
          throw err
        }
        res.status(201).send(updatedFavorites)
      }
    )

  })
}

module.exports = {
  getLines,
  getUser,
  insertNewLineToUserFavorites
}
