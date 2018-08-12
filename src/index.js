import express from 'express';

var app = express();
import bodyParser from 'body-parser';
import {convertNumbersToT9} from './t9-converter';
import wordCreator from "./utils/wordCreator";
import connectToDb from './models/dbConnection';
import {getWordsByKey} from './services/wordService';

connectToDb(
    success => {
        console.log("Connected!!!!");
        wordCreator();
    },
    error => console.log("Connection Error!!!!"),
);


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/convertWordsToTNine')

// create a t9 (accessed at GET http://localhost:8080/api/v1/convertWordsToTNine)
    .post(function (req, res) {
        getWordsByKey(req.body.message).then(wordList => {
            if (wordList.length > 0) {
                res.json({words: wordList});
            } else {
                const result = convertNumbersToT9(req.body.message);
                res.json({words: result});
            }
        });

    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api/v1
app.use('/api/v1', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);