import jwt    from 'jwt-simple';

import User   from '../models/user';
import config from '../config';


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

export function signup(req, res, next) {
  const email    = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(422).send({error: 'You must provide email and password'});
  }

  User.findOne({email}, (err, existingUser) => {
    if (err) return next(err);

    if (existingUser) {
        //422: Unprocessable entity
        return res.status(422).send({error: 'Email is in use'});
    }

    const user = new User({email, password});
    user.save((err) => {
      if (err) return next(err);
      res.json({token: tokenForUser(user)});
    });
  });
}

export function signin(req, res, next) {
  const token = tokenForUser(req.user);
  res.send({token});
}