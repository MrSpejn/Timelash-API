import express      from 'express';
import http         from 'http';
import path         from 'path';
import morgan       from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';

import router       from './router';

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
router(app);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Timelash API listening on port 3000!');
});

// const server = http.createServer(app);
// server.listen(port);
// console.log(`Server listening at port ${port}`);

