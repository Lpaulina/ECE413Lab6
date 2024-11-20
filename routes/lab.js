var express = require('express');
var router = express.Router();
var Recording = require("../models/lab");

router.get('/status', async function(req,res){
    var zipCode = req.query.zip;
    if (!zipCode){
        res.status(400).json({"error": "a zip code is required"});
        return;
    }
    Recording.find(function(err, recordings){
        if (err){
            res.status(400).json({"error" : err});
        }
        else{
            if (recordings.length == 0){
                res.status(400).json({"error" : "Zip does not exist in the database."});
                return;
            }
            let avg = 0;
            for(const recording of recordings){
                avg += recording.airQuality;
            }
            avg /= recordings.length;
        
            res.status(200).json({avg});
        }
    })
    

})

router.post('/register',  function(req,res){
    if (!req.body.zip || ! req.body.airQuality){
        res.status(400).json({"error": "zip and airQuality are required."})

        return;
    }
    const newRecording = new Recording({
        zip : req.body.zip,
        airQuality : req.body.airQuality
    })
    newRecording.save(function (err, student){
        if (err){
            res.status(400).send(err);
        }
        else{
            res.status(201).json({"response": "Data recorded."})
        }
    });

})

module.exports = router;