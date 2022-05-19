const Trades = require('../models/trades');

exports.store = async (req, res) => {
  const { tradeType, user_id, symbol, shares, price } = req.body;
  if(!tradeType || !user_id || !symbol || !shares || !price) {
    res.status(404).json({
      error: 'Bad Request',
      message: 'Please provide all required fields'
    });
  }
  if(tradeType !== 'buy' || tradeType !== 'sell') {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Trade type must be either "buy" or "sell"'
    });
  }

  if(shares < 1 || shares > 100) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Shares must be between 1 and 100'
    });
  }

  const trades = await Trades.find();
  
  const id = trades.length + 1;

  const timestamp = Date.now();

  try {
    const trade = await Trades.create({
      id,
      tradeType,
      user_id,
      symbol,
      shares,
      price,
      timestamp
    });
    res.status(201).json(trade);
  }catch(err) {
    res.status(400).json({
      error: 'Something went wrong',
    });
  }
};

exports.read = async (req, res) => {
  const {type, user_id } = req.query;

  if(type && user_id) {
    const trades = await Trades.find({
      where: {
        tradeType: type,
        user_id: user_id
      }
    }).sort({'id': -1});
    res.status(200).json(trades);
  }else if(type && !user_id) {
    const trades = await Trades.find({
      where: {
        tradeType: type
      }
    }).sort({'id': -1});
    res.status(200).json(trades);
  }else if(user_id && !type) {
    const trades = await Trades.find({
      where: {
        user_id: user_id
      }
    }).sort({'id': -1});
    res.status(200).json(trades);
  }else {
    const trades = await Trades.find();
    res.status(200).json(trades);
  }
};

exports.getOne = async (req, res) => {
  const {id} = req.params;
  try {
    const trade = await Trades.findById(id);
    res.status(200).json(trade);
  }catch(err){
    res.status(404).json({
      error: 'ID not found',
    });
  }
};

exports.update = (req, res) => {
  res.status(405).json({
    error: 'Update method not allowed',
  });
};

exports.edit = (req, res) => {
  res.status(405).json({
    error: 'Edit method not allowed',
  });
};

exports.destroy = (req, res) => {
  res.status(405).json({
    error: 'Delete method not allowed',
  });
};