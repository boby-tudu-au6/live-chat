const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messageSchema = new Schema({
  from:{type:String,ref:'user'},
  time:{type:Date,default:Date.now},
  to:String,
  body:{type:Object}
})

const Message = mongoose.model('message',messageSchema)
module.exports = Message