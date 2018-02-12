const express = require('express');
const path = require('path');
const mongo = require('mongodb').MongoClient;
const Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: 'ADD KEY',
      secret: 'ADD SECRET'
    };

// DB URL
const url = 'ADD DB URL/URI';

// set the port of application
const port = process.env.PORT || 3000;

// Creating server
let app = express();

/*************************************** 
Routing Functions
***************************************/
// Index route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Routing search request
app.get('/api/imagesearch/:search', function (req, res) {
    let offset = req.query.offset;

    // Validating offset
    if (isNaN(offset) || offset < 1 || offset > 100) {
        res.send('Offset must: be a number, be greater than 1, be less than 100.');
    }

    // Getting images from Flickr and sending to user in an array of objects
    getImages(req.params.search, offset, function(err, results) {
        if (err) {
            console.log('API Error');
        }
        let userResults = [];

        for (let i = 0; i < results.length; i++) {
            let tempStorage = {};

            // Getting image main URL
            tempStorage['url'] = results[i]['url_z'];

            // Getting snippet info
            if (results[i]['title'] !== '') {
                tempStorage['snippet'] = results[i]['title'];
            } else if (results[i]['description']['_content'] !== '') {
                tempStorage['snippet'] = results[i]['description']['_content'];
            } else {
                tempStorage['snippet'] = 'No info about image.';
            }

            // Getting thumbnail
            tempStorage['thumbnail'] = results[i]['url_q'];

            // Getting context URL
            tempStorage['context'] = 'https://www.flickr.com/photos/' +
            results[i]['owner'] + '/' + results[i]['id'];

            // Adds object to array (will be returned to user when complete)
            userResults.push(tempStorage);
        }
        logInsert(req.params.search);
        res.send(userResults);
    });
});

// See latest search terms route
app.get('/api/latest/imagesearch', function (req, res) {
    mongo.connect(url, function(err, client) {
        if (!err) {
            console.log('Connected to DB');
        } else {
            console.log('Cannot connect to DB');
        }
    
        // Connecting to DB (REQUIRED FOR MONGO 3.x)
        let db = client.db('imagesearch_fcc');
    
        // Getting past 10 search terms and returning results
        db.collection('history').find({}).sort({when: -1}).limit(10).toArray(function(err, results) {
            let userResults = [];

            for (let i = 0; i < results.length; i++) {
                let tempStorage = {
                    'term': null,
                    'when': null
                };

                tempStorage['term'] = results[i]['term'];
                tempStorage['when'] = results[i]['when'];
                
                userResults.push(tempStorage);
            }

            res.send(userResults);
            
            db.close;
        });
    
    });
});

/*************************************** 
Helper Functions
***************************************/
// Get images
function getImages(query, numResults, callback) {
    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
        if (error) {
            console.log('Flickr error');
        }
    
        // Getting images from flickr and returning via callback
        flickr.photos.search({
            text: query,
            page: 1,
            sort: 'interestingness-desc',
            per_page: numResults,
            extras: ['url_z', 'url_q', 'description', 'tags']
          }, function(err, results) {
            if(err) { throw new Error(err); }
            
            callback(null, results.photos.photo);
          });
      });
}

// Insert log into DB
function logInsert(term) {
    mongo.connect(url, function(err, client) {
        if (!err) {
            console.log('Connected to DB');
        } else {
            console.log('Cannot connect to DB');
        }
    
        // Connecting to DB (REQUIRED FOR MONGO 3.x)
        let db = client.db('imagesearch_fcc');
    
        let tempObj = {
            'term': term,
            'when': new Date()
        };
    
        db.collection('history').insertOne(tempObj);
    
        db.close;
    
    });
}

/*************************************** 
Start Server
***************************************/
// Listening on port
app.listen(port);