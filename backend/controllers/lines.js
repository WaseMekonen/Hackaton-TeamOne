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
        // console.log(lines);
        db.close();
      });
  });
};


const getMostPopularLines = (res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      console.log(err);
    }
    const database = db.db(dbName);
    database
      .collection("mostPopularLines")
      .find({})
      .toArray(function (err, lines) {
        if (err) throw err;
        res.send(lines);
        // console.log(lines);
        db.close();
      });
  });
};

const getLine = (res, req) => {
  const userLineChoice = { "busLine": Number(req.params.busLine) }
  mongoClient.connect(url, (err, db) => {
    if (err) {
      console.log(err);
    }
    const database = db.db(dbName);
    database
      .collection("lines")
      .findOne(userLineChoice, function (err, line) {
        if (err) throw err;
        res.send(line);
        db.close();
      });
  });
};

module.exports = {
  getLines,
  getLine,
  getMostPopularLines
}
