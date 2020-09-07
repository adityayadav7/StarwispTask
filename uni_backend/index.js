const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const {
  UniversityData,
  getUniversityDetails,
  getUniversityDetailsById,
  UpdateUniversityDetails,
  deleteUniversityDetails,
  login
} = require('./UniversityData/unidata')

app.post('/api/add',UniversityData);
app.get('/api/data',getUniversityDetails);
app.get('/api/v1/data/:id',getUniversityDetailsById);
app.put('/api/update/univerity/data/:id',UpdateUniversityDetails);
app.delete('/api/delete/:id',deleteUniversityDetails);
app.post('/api/login',login);
 
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
 