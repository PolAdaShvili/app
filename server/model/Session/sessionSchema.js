const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const sessionSchema = new mongoose.Schema({
  userId: ObjectId,
  hash: String,
  expire_at: Date
});

const SessionSchema = mongoose.model('SessionSchema', sessionSchema);

module.exports = {
  Session:SessionSchema
};