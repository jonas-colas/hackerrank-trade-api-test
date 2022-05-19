// Uncomment the code below to use Sequelize ORM
// const {Sequelize} = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");

// Uncomment the code below to use Mongoose ORM
const mongoose = require('mongoose');


// Insert your model definition below
const tradesSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true},
  tradeType: { type: String, required: true },
  user_id: { type: Number, required: true },
  symbol: { type: String, required: true },
  shares: { type: Number, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Number, required: true },
});

module.exports = mongoose.model('Trades', tradesSchema);
 