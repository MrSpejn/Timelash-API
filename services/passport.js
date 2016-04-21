import passport      from 'passport';
import passport_jwt  from 'passport-jwt';
import LocalStrategy from 'passport-local';

import config        from '../config';
import User          from '../models/user';

const StrategyJWT = passport_jwt.Strategy;
const ExtractJWT  = passport_jwt.ExtractJwt;


const passwordOptions = {
  usernameField: 'email'
};

const passwordLogin = new LocalStrategy(passwordOptions, function(email, password, done) {
  User.findOne({email}, (err, user) => {
    if (err)   return done(err, false);
    if (!user) return done(null, false);

    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err, false);
      if (!isMatch) return done(null, false);

      return done(null, user);
    });

  })
});


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
passport.use(passwordLogin);