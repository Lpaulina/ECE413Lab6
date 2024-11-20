var express = require('express');
var router = express.Router();
var Recording = require("../models/lab");

router.get('/status', async function(req,res){
    var zipCode = req.query.zip;
    if (!zipCode.length){
        var errormsg = {error : "a zip code is required."}
        res.status(400).json(errormsg);
    }
    else{
    Recording.find({ zip: req.query.zip}, function(err, recordings){
        if (err){
            res.status(400).json({error : "a zip code is required."});
        }
        else{
            if (recordings.length === 0){
                var errormsg = {error : "Zip does not exist in the database."}
                res.status(400).json(errormsg);
            }
            else {
                let avg = 0;
                for(const recording of recordings){
                    avg += recording.airQuality;
                }
                avg /= recordings.length;
                avg = avg.toFixed(2);
            
                res.status(200).json(avg);
        }
        }
        
    })
}

})


router.post('/register',  function(req,res){
    if (!req.body.zip || ! req.body.airQuality){
        var errormsg = {error : "zip and airQuality are required."}
        res.status(400).json(errormsg)

    }
    else{
        const newRecording = new Recording({
            zip : req.body.zip,
            airQuality : req.body.airQuality
        })
        newRecording.save(function (err, student){
            if (err){
                res.status(400).json({error : "zip and airQuality are required."});
            }
            else{
                var msg = {response : "Data recorded."}
                res.status(201).json(msg)
            }
        });
    }

})

module.exports = router;