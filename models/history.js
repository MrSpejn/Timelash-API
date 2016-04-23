import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const HistoryItemSchema = new Schema({
  time: {type: Number, required: true},
  name: {type: String, required: true, unique: true},
  date: {type: Date, required: true},
  category: {type: String},
  userID: {type: String, required: true}
});

export default mongoose.model('history', HistoryItemSchema);