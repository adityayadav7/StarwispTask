const functions = require('firebase-functions');

const express = require('express');

const app = express();
const cors = require('cors')
app.use(cors());

const {
    UniversityData,
    getUniversityDetails,
    deleteUniversityDetails,
    UpdateUniversityDetails,
    getUniversityDetailsById
       } =require('./UniversityData/unidata')

app.post('/add',UniversityData);
app.get('/data',getUniversityDetails);
app.get('/v1/data/:item_id',getUniversityDetailsById)
app.put('/update/univerity/data/:item_id',UpdateUniversityDetails)
app.delete('/delete/:_id',deleteUniversityDetails)
exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
