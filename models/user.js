import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
  'email': {type: String, unique: true, lowercase: true},
  'password': String
});

export default mongoose.model('user', userSchema);

