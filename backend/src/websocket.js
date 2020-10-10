const User = require('../models/userModel')
const Message = require('../models/messageModel')
const server = require('./index')
const jwt = require("jsonwebtoken")
const bufferToString = require('../controllers/fileUpload/bufferToString/bufferToString')
const cloudinary = require("../controllers/fileUpload/cloudinary/cloudinary")

 
// websocket functions
const io = require('socket.io')(server);

io.on('connection', socket => {
	// connection message
	console.log(`made socket connection at ${socket.id}`)

	// login method
  socket.on("login",async data=>{
	  console.log(typeof(parseInt(data.data)), data.data)
		try{
			const user = await User.findOne({phone:parseInt(data.data)})
			if(user===null){
				const newuser = await User.create({phone:parseInt(data.data)})
				var token = jwt.sign({ user:newuser }, 'secret');
				return socket.emit('login',{status:"ok",token})
			}
			var token = jwt.sign({ user:user }, 'secret');
			socket.emit('login',{status:"ok",token})
		}catch(err){
			console.log(err.message)
			socket.emit('login',{status:'failed',message:err.message})
		}
  })

//   checklogin
  socket.on("checklogin",async ({token})=>{
	try{
		let decoded = jwt.verify(token, 'secret')
		if(decoded.user!==undefined){
			const user = await User.findOne({_id:decoded.user._id})
			return socket.emit('checklogin',{status:'ok',...user})
		}
		return socket.emit('checklogin',{status:'failed'})
	}catch(err){
		return socket.emit('checklogin',{status:'failed'})
	}
  })

//   chat method
	socket.on("chat",async data=>{
		const user = await User.find({})
		try{
			if(user.length!==0 && data.from!==parseInt(data.to)){
				if(data.chat.type!=='img'){
					const chat = await Message.create({
						from:data.from,
						to:data.to,
						body:data.chat
					})
					console.log(typeof data.from)
					await User.updateOne({phone:data.from},{recent:data.to})
					return io.sockets.emit('chat',{status:"ok",...chat})
				}else{
					console.log(data.chat.body)
					const imageContent = bufferToString(data.chat.body.name, data.chat.body.file);
					const { secure_url } = await cloudinary.uploader.upload(imageContent);
					console.log(secure_url)
					const chat = await Message.create({
						from:data.from,
						to:data.to,
						body:{
							type:"img",
							body:secure_url
						}
					})
					return io.sockets.emit('chat',{status:"ok",...chat})
				}
			}else{
				return socket.emit('chat',{
					status:'failed',
					message:"no user found with given number, personal number not allowed"
				})
			}
		}catch(err){
			socket.emit('chat',{
				status:'failed',
				message:err.message
			})
		}
	})

	socket.on('getchat',async ({data,data1})=>{
		try{
			const chats = await Message.find({
				$or:[
					{from:parseInt(data),to:data1},
					{to:data,from:parseInt(data1)}
				]
			}).sort({time:-1})
			return socket.emit('getchat',{
				status:"ok",
				chats
			})
		}catch(err){
			return socket.emit('getchat',{status:"failed",message:err.message})
		}
	})

	socket.on("getphoto",async ({token})=>{
		const decoded = jwt.verify(token,'secret')
		if(decoded.user!==undefined){
			const user = await Message.find({
				$or:[
					{from:decoded.user.phone},
					{to:decoded.user.phone}
				]
			})
			.select('type')
			.select('body')
			socket.emit('getphoto',user)
		}
	})

});

module.exports = io