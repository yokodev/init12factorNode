
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

mongoose.connect('mongodb://localhost/test', 
	(err)=>{
	if(err) throw err
	console.log("Mongoose connected")	
})

const User = mongoose.model('User', {name: String})


app.post('user', async (req,res)=>{
	try{
		const user = new User({name:req.body.username})
		await user.save()
		res.send('Success').status(201)
	} catch(err){
		res.send(err.message).status(500)
	}
})

app.listen(3000, ()=>console.log('My App listening on port 3000'))