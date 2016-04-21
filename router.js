import {signup}  from './controllers/authentication';

export default (app) => {
    app.post('/signup', signup);
}