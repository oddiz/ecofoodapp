/*eslint-disable*/

const express           = require('express');
const MongoClient       = require('mongodb').MongoClient;
const bodyParser        = require('body-parser');
const db                = require('./config/db');
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


{}
app.listen(8000, () => {
    console.log('listening to port 8000');
})