// Administratie Route
const express 	= require('express')
const session 	= require('express-session')
const router	= express.Router( )
const sequelize = require('sequelize')
const db		= require(__dirname + '/../modules/database')


// Require Multer
const multer 	= require('multer')
const storage 	= multer.diskStorage({
	// Declare where to save file
	destination: function(req, file, callback) {
		callback(null, "static/uploads")
	},
	// Declare how to name file
	filename: function(req, file, callback) {
		let newImage = file.fieldname + '-' + 1
		callback(null, newImage)
	}
})
const upload 	= multer({storage: storage})


// GET
router.get('/admin', (request, response) => {
	let user = request.session.user

	db.user.findOne({
		where: {id: user.id}
	}).then( admin => {
		db.news.findAll().then( news => {
			response.render('admin', {news: news, message: request.query.message})
		})
	})	
})

module.exports = router