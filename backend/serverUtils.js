const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
// const objectId = mongoDB.ObjectId;
const url = "mongodb://localhost:27017";

const getMovies = (res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      console.log(err);
    }
    const database = db.db("Netflix");

    database
      .collection("movies")
      .find({})
      .toArray(function (err, movies) {
        if (err) throw err;
        res.send(movies);
        console.log(movies);
        db.close();
      });
  });
};

module.exports(getMovies);
