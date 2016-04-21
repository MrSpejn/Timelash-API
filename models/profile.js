import mongoose from 'mongoose';

import activitiesDefault from '../default/activities';

const Schema = mongoose.Schema;
const ActivitySchema = new Schema({
  checkpoint: {type: Number, required: true},
  name: {type: String, required: true, unique: true},
  category: {type: String}
});

const ProfileSchema = new Schema({
  userID: {type: String, required: true, unique: true},
  activities: {type: [ActivitySchema], default: activitiesDefault}
});

export default mongoose.model('profile', ProfileSchema);