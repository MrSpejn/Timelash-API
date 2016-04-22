import moment     from 'moment';
import _          from 'lodash';
import Statistics from '../models/statistics';
import History    from '../models/history';

export function showStatistics(req, res, next) {
  Statistics.findOne({userID: req.user.id}, (err, stats) => {
    if (err) return next(err);
    if (!stats) {
      firstCalculation(req.user.id, res);
    }
    else {
      subsequentCalculation(req.user.id, res);
    }
  });
}

function firstCalculation(userID, res) {
  reduceHistoryByCategorySince(userID, moment().startOf('week'))
    .then((arrayOfCategories) => {
      History.find({userID}, null, {limit: 1, sort: {date: -1}}, (err, newestItem) => {
        const lastDate = newestItem[0].date;
        new Statistics({userID, lastDate, statistics: arrayOfCategories}).save((err) => {
          console.log('Tried to save');
          if(!err) {
            console.log('Saved');
          }
        });
        res.json(arrayOfCategories);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}


function subsequentCalculation(userID, res) {
  console.log('Second Calculation');
  //reduceHistoryByCategorySince(userID);
}

function reduceHistoryByCategorySince(userID, date) {
  return new Promise((resolve, reject) => {
      History.find({userID, date: {$gt: date, $lt: moment()}}, (err, history) => {
        if (err) return reject(err);

        if (history) {
          resolve(reduceHistory(history));
        }
        else {
          resolve([]);
        }
      });
  });
}

function reduceHistory(history) {
  const categoriesTimeSpent = new Map();
  const categoriesPercentage = [];

  const allTime = history.reduce((sum, item) => {
    if (!item.category) item.category = 'other';

    const prevValue = categoriesTimeSpent.get(item.category);
    if (prevValue) {
      categoriesTimeSpent.set(item.category, prevValue + item.time);
    } else {
      categoriesTimeSpent.set(item.category, item.time);
    }
    return sum += item.time;
  }, 0);

  categoriesTimeSpent.forEach((value, key) => {
    categoriesPercentage.push({
      'name': key,
      'percentage': value * 100 / allTime
    });
  });
  categoriesPercentage.push({
    'name': 'allTime',
    'time': allTime
  });
  return categoriesPercentage;
}


/*const categories = _.uniq(result.map((el) => el.category || 'other'));
const totalTimeSpent = result.reduce((sum, item) => {
  return sum += item.time;
}, 0);

const timeSpentByCategory = categories.map((category) => {
  const value = result.reduce((sum, item) => {
    if (item.category === category) {
      sum += item.time;
    }
    return sum;
  }, 0);

  return {category, value: value / totalTimeSpent * 100};
});*/