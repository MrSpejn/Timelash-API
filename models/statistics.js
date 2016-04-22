import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const StatisticsSchema = new Schema({
    userID: String,
    lastDate: Date,
    statistics: [
      Object
    ]
});

export default mongoose.model('statistics', StatisticsSchema);