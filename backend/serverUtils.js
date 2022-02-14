const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
// const objectId = mongoDB.ObjectId;
const url = "mongodb://localhost:27017" || process.env.MONGOURL;

const getMovies = () => {
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
        console.log(movies);
        db.close();
      });
  });
};


const getTvShows = ()=>{
  mongoClient.connect(url, (err, db) =>{
    if (err) {
      console.log(err);
    }
    const database = db.db("Netflix");

    database
    .collection("tvShows")
    .find({})
    .toArray(function (err, tvShows){
      if(err) throw err;
      console.log(tvShows);
      db.close();
    });
  });
};

module.exports(getMovies, getTvShows);
