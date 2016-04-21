import passport     from 'passport';
import passport_jwt from 'passport-jwt'

import config       from '../config';
import User         from '../models/user';

const StrategyJWT = passport_jwt.Strategy;
const ExtractJWT  = passport_jwt.ExtractJwt;

const JWTOptions = {
  jwtFromRequest: ExtractJWT.fromHeader('authorization'),
  secretOrKey: config.secret
};

const JWTLogin = new StrategyJWT(JWTOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
      if (err) return done(err, false);

      if (user) {
        done(null, user);
      } else {
        done(null, false)
      }
  });
});

passport.use(JWTLogin);