const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  instructor: { type: String, required: true, trim: true },
  price: { type: Number, default: 0 },
  duration: { type: String, default: 'Self-paced' },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
