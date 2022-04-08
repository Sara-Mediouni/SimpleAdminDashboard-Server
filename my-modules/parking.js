var mongo = require('mongodb');
const urlDatabase = 'mongodb://localhost:27017/';
var url = require('url');

var ObjectId = require('mongodb').ObjectId;

exports.createParking = function (req, res) {

    var body = [];
    req.on('data', (b) => {
        body.push(b)
    }).on('end', () => {
        let textData = Buffer.concat(body).toString();
        let jsonParking;
        try {
            jsonParking = JSON.parse(textData);
 
            var MongoClient = require('mongodb').MongoClient;

            // url connection 
            MongoClient.connect(urlDatabase).then((db) => {
                //...
                console.log("DATABASE CONNECTED");

                // 
                var database = db.db('technologiaDB');


                database.collection('parking').insertOne(jsonParking).then((data) => {
                    res.send({ success: true, message: "Parking inserted successfully !!" });
                }).catch((err) => {
                    res.send({ success: false, message: "Could't insert the parking data" });
                })



            }).catch((err) => {
                // 
                res.send({ success: false, message: "Something went wrong" });
            })


        } catch (error) {
            res.send({ success: false, message: "badly formated data" });
        }



    })

}


exports.findByVehicule = function (req,res) {
    const query  = url.parse(req.url,true).query;

    console.log(query);

    let filter = {}

    if (query.id != null) {
        filter.vehicule_id  =  (query.id)
    }

 

    console.log(filter);

    var MongoClient = require('mongodb').MongoClient;

    // url connection 
    MongoClient.connect(urlDatabase).then((db) => {
        //...
        console.log("DATABASE CONNECTED");

        // 
        var database = db.db('technologiaDB');


        // { key : value }
        database.collection('parking').find( filter ).toArray().then((result)=>{
            res.send({ success: true, data: result });
        }).catch((err)=>{
            res.send({ success: false, message: "Something went wrong" });
        })



    }).catch((err) => {
        // 
        res.send({ success: false, message: "Something went wrong" });
    })
}
exports.ParkingDelete = function (req, res) {
    var body = [];
    req.on('data', (b) => {
        body.push(b)
    }).on('end', () => {
        let textData = Buffer.concat(body).toString();
        let jsonParking;
        try {
            jsonParking = JSON.parse(textData);
 

            // insert DATABASE 
            // client => server database
            var MongoClient = require('mongodb').MongoClient;

            // url connection 
            MongoClient.connect(urlDatabase).then((db) => {
                //...
                console.log("DATABASE CONNECTED");

                // 
                var database = db.db('technologiaDB'); 
                
                // update one
                database.collection('parking').deleteOne ( { _id:ObjectId(jsonParking.id) } ).then((data) => {
                    res.send({ success: true, message: "vehicule deleted successfully !!" });
                }).catch((err) => {
                    res.send({ success: false, message: "Something went wrong" });
                })
                



            }).catch((err) => {
                // 

                console.log(err);
                res.send({ success: false, message: "Something went wrong" });
            })


        } catch (error) {
            res.send({ success: false, message: "badly formated data" });
        }



    })

}

