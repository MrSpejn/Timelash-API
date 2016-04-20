import express      from 'express';
import path         from 'path';
import logger       from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.send('Timelash Backend Here');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;