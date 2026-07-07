// server/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  price: { type: Number },
  category: { type: String }, // Workshop, Concert, Indie, v.v.
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ticketsSold: { type: Number, default: 0 },
  maxTickets: { type: Number, default: 100 },
  eventDate: { type: Date }
});

module.exports = mongoose.model('Event', eventSchema);