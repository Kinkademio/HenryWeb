const {model, Schema} = require('mongoose');
const shortid = require('shortid');
var schema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
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