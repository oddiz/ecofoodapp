/*eslint-disable*/

const express           = require('express');
const MongoClient       = require('mongodb').MongoClient;
const bodyParser        = require('body-parser');
const db                = require('./config/db');
const fs                = require('fs')
const https             = require('https');
const port = 8000;
const app = express();

app.use(bodyParser.json({  extended: true  }));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


console.log(db.url);

MongoClient.connect(db.url, (err, database) => {
    if (err) { return console.log (err) }
    const highscoresDB = database.db('kaansarkayadb')
    require('./routes')(app, highscoresDB);
    //console.log(database);

})
const options = {
    key: fs.readFileSync('./keys/mongoaws.tk.key'),
    cert: fs.readFileSync('./keys/mongoaws.tk.crt'),
    ca: fs.readFileSync('./keys/mongoaws.tkchain.crt'),
}
https
.createServer(options, app)
.listen(port, () => {
    console.log('listening to port 8000');
})