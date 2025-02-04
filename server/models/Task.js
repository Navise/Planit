const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  date: { type: String, required: true },
});

module.exports = mongoose.model('Task', taskSchema);
