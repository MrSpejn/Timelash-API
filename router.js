import passport         from 'passport';

import {signup}         from './controllers/authentication';
import passportService  from './services/passport';


const requireAuth = passport.authenticate('jwt', { session: false });
export default (app) => {
    app.get('/', requireAuth, (req, res, next) => {
      res.end('You must be very important if you are here');
    });
    app.post('/signup', signup);
}