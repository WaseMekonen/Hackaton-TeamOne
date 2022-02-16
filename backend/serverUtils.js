const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
// const objectId = mongoDB.ObjectId;
const url = "mongodb://localhost:27017" || process.env.MONGOURL;
const database = db.db("EASYBUSY");

const getLines = (res) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      console.log(err);
    }
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


const getUser = ()=>{
  mongoClient.connect(url, (err, db) =>{
    if (err) {
      console.log(err);
    }
    database
    .collection("users")
    .findOne({})
    .toArray(function (err, user){
      if(err) throw err;
      console.log(user);
      db.close();
    });
  });
};

module.exports(getLines, getUser);
