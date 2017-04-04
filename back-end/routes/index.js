var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var mongoCreds = require('../config/mongoCred');
// console.log(mongoCreds.username)
var User = require('../models/user');
var Club = require('../models/club');
// var EventPost = require('../models/eventPost');
// var EventComments = require('../models/eventComments');
// var Friends= require('../models/friends');
// var majilis= require('../models/majilis');

// mongoose.connect('mongodb://' + mongoCreds.username + ':' + mongoCreds.password + '@ds057476.mlab.com:57476/snaap_dog');
mongoUrl='mongodb://' + 'summer' + ':' + 'summer' + '@ds127878.mlab.com:27878/majilis';
mongoose.connect(mongoUrl,function(error,database){
    if (error){
        console.log(error)
    }else{
        db=database;
        console.log("Connected to mongo successfully")
    }
});


var bcrypt = require('bcrypt-nodejs');
var randToken = require('rand-token');
// LOG IN --------------------------------------------------
router.post('/login', function(req, res, next) {
    var user=req.body.user

    User.findOne({'username': user.username}, function(err, docs) {
        if (err) {
            console.log("Could not Find")
            console.log(err);
            res.json({
                failure: "badPass",
                status: "Failed at findOne"
            });
        } else {
            if (docs == null) {
                console.log("Nothing found. It failed")
                console.log(docs);
                res.json({
                    failure: "badPass",
                    status: "Failed at findOne, doc is null"
                });
            } else {
                var passwordCheck = bcrypt.compareSync(user.password, docs.password);
                console.log(passwordCheck);
                if (passwordCheck) {
                    var token = randToken.generate(32);
                    console.log('token:' + token);
                    User.findOneAndUpdate({'_id': docs._id}, {$set: {'token': token}}, {upsert: true, new: true}, function(err, docs) {
                        console.log("password checked");
                        res.json({
                            success: "userFound",
                            status: "User found",
                            docs: docs,
                            token:token
                        });
                    });
                } else {
                    console.log("else pass")
                    res.json({
                        failure: "badPass",
                        status: 'User name and password did not match.'
                    });
                }
            }
        }
    });
}); //end of login router
// REGISTER --------------------------------------------------
router.post('/register', function(req, res, next) {
    var user = req.body.user;
    console.log(user);
    User.findOne({'username': user.username}, function (err, doc) {
        if (err) {
            console.log('error!');
            console.log(err);
            res.json({
                passFail: 0,
                status: "Failed at finding one"
            });
        } else {
            if (doc == null) {
                var newUser = new User({
                    username: user.username,
                    password: bcrypt.hashSync(user.password),
                    email: user.email

                });
                console.log(newUser);
                newUser.save(function(err, saved, status) {
                    if (err) {
                        console.log(err);
                        res.json({
                            passFail: 0,
                            status: "Registration failed."
                        });
                    } else {
                        console.log(saved);
                        res.json({
                            passFail: 1,
                            status: "Registered!",
                            docs: saved,
                            token: token
                        });
                    }
                });
            } else {
                res.json({
                    passFail: 0,
                    status: "Found a match. Try a different username."
                });
            }
        }
    });
});

//create new club

router.post('/clubCreate',function(req,res,next){
    var club=req.body.club;

    console.log(club.username);
    console.log(club.name);
    User.findOne({'username': club.username}, function (err, doc) {
        if (err) {
            console.log('error!');
            console.log(err);
            res.json({
                passFail: 0,
                status: "Failed at finding one"
            });
        } else {
            if (doc ) {
                var newClub = new Club({
                    username:club.username,
                    name:club.name,
                    type:club.type,
                    about:club.about

                });
                console.log('Did it work?');
                newClub.save(function(err, saved, status) {
                    if (err) {
                        console.log('nope');
                        console.log(err);
                        res.json({
                            passFail: 0,
                            status: "Club creation failed."
                        });
                    } else {
                        console.log(saved);
                        res.json({
                            passFail: 1,
                            status: "Club created!"
                        });
                    }
                });
            } else {
                res.json({
                    passFail: 0,
                    status: "Username not found"
                });
            }
        }
    });

});

//get all the clubs to populate club page. get club info
router.get('/clubInfo',function(req,res,next){
    console.log("in the club info portion")
    Club.find()
        .exec(function(err,docs){

            if(err){
                console.log("error here")
                return next(err)
            }else{
                console.log("Club crap works")
                res.json(docs)

            }
        })

});

router.post('/clubProfileInfo',function(req,res,next){
    console.log("in the club info portion")
    var clubName=req.body.clubName;
    console.log('club name is')
    console.log(clubName.clubName);
    Club.findOne({'name': clubName})
        .exec(function(err,docs){

            if(err){
                console.log("error here")
                return next(err)
            }else{
                console.log("Club crap works")
                res.json(docs)

            }
        })

});

module.exports = router;




