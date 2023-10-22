const {model, Schema} = require('mongoose');
var schema = new Schema({
  _id: {
    type: String,
    default: Math.floor(Math.random() * (99999 - 10000) + 10000) //Генерируем рандомный id шник 
  },
  taskName:{
    type: String,
    require: true
  },
  tasks: {
    type: Schema.Types.Mixed,
    require: true
  }
});
module.exports = model('Test', schema)