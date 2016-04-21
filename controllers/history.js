import History from '../models/history';

export function getHistory(req, res, next) {
  const userID = req.user.id;
  History.find({userID}, (err, history) => {
    if (err) return next(err);
    return res.json(history);
  });
}

export function extendHistory(req, res, next) {
  const story = req.body;
  if (!story.name || !story.time || !story.date) {
    res.status(422).send("You must supply all required fields");
  }
  new History({...story, userID: req.user.id}).save((err, savedObject) => {
    if (err) return next(err);
    return res.status(200).send(savedObject);
  });
}