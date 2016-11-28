'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const multer = require('multer');
const upload = multer({dest: 'tmp-images/'});

const UploadCtrl = require('./controllers/UploadController');

app.post('/upload', upload.single('image'), UploadCtrl.uploadByFile);
app.post('/fetch', UploadCtrl.uploadByURL);

app.get('/', function (req, res) {
    res.send('Edoo upload!');
});

app.listen(2009, function () {
    console.log('App listening on port 2009!')
});