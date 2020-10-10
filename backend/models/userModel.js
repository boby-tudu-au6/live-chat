const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  phone:Number,
  recent:String
})
userSchema.index({ phone: 1 });

const User = mongoose.model('user',userSchema)
module.exports = User