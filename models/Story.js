const mongoose = require('mongoose');
const { Schema } = mongoose;

const storySchema = new Schema({
  'title': { 'type': String, 'trim': true },
  'text': { 'type': String, 'trim': true },
  'genre': {},
  'author': { 'type': String, 'trim': true },
  '_authorID': { type: String, required: true }, // the mongoose ID for the user who authored the story
  'nextThreads': {},
  'parent': { 'type': String, 'trim': true },
  'original': { 'type': String, 'trim': true }
});

mongoose.model('story', storySchema);
