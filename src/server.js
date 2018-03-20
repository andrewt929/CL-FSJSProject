// src/server.js

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./routes');
require('dotenv').config();

// Authenticate to GoogleVison API
let apiKey = process.env.GOOGLEAPIKEY;
console.log(apiKey);

// Authenticate to Flikr API

// Load mongoose package
const mongoose = require('mongoose');

// Connect to MongoDB and create/use database as configured
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

// Import all models
require('./models/file.model.js');

const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use('/api', router);

// Create the image request
const request = {
  image: {source: {imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/MtRushmore.jpg/1200px-MtRushmore.jpg'}},
  features: [],
};