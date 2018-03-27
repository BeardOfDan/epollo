const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  'email': { 'type': String, 'required': true, 'trim': true },
  'displayName': { 'type': String, 'required': true, 'trim': true },
  'stories': { 'type': Array, 'default': [] },
  'threads': { 'type': Array, 'default': [] }
});

mongoose.model('user', userSchema);
