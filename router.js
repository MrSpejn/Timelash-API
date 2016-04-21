import passport                 from 'passport';

import {signup, signin}         from './controllers/authentication';
import passportService          from './services/passport';


const requireAuth   = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', {session: false});

export default (app) => {
    app.get('/', requireAuth, (req, res, next) => {
      res.end('You must be very important if you are here');
    });
    app.post('/signin', requireSignin, signin);
    app.post('/signup', signup);
}