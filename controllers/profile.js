import Profile from '../models/profile';

export function showProfile(req, res, next) {
  Profile.findOne({userID: req.user.id}, (err, profile) => {
    if (err) return next(err);

    return res.send(profile);
  });
}

export function updateProfile(req, res, next) {
  const propsToUpdate = req.body;

  Profile.findOneAndUpdate({userID: req.user.id}, propsToUpdate, (err, profile) => {
    if (err) return next(err);

    return res.status(200).end();
  });
}