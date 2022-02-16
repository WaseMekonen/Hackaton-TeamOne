const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
const objectId = mongoDB.ObjectId;
require("dotenv").config();
const url = process.env.MONGOURL;
const dbName = "esaybusy";


let data;


const getAllLines = ()=>{
  
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
        data=lines;
        liveUpdate();
        db.close();
      });
  });
}

function liveUpdate(){
 

  const shafel = setInterval(()=>{

    for (let i = 0; i < data.length; i++) {
      data[i].numOfPassenger = Math.floor((Math.random() * 55)+0)
      data[i].currentStation++
      if(data[i].currentStation>4){
        data[i].currentStation = 0;
      }
    }

    for (let i = 0; i < data.length; i++) {
      mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db(dbName);
        let myquery = { busLine: data[i].busLine };
        let newvalues = { $set: {currentStation:data[i].currentStation, numOfPassenger:data[i].numOfPassenger } };
        dbo.collection("lines").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
      });
    }
    },5000)


}


module.exports = {
  getAllLines,  
  }