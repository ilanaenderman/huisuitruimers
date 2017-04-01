// Home Route
const express = require( 'express')
const session = require('express-session')
const router  = express.Router( )
const db      = require(__dirname + '/../modules/database')

const multer 	= require('multer')
const storage 	= multer.diskStorage({
	// Declare where to save file
	destination: function(req, file, callback) {
		callback(null, "static/uploads")
	},
	// Declare how to name file
	filename: function(req, file, callback) {
		let newImage = file.fieldname + '-' + Date.now()
		callback(null, newImage)
	}
})
const upload 	= multer({storage: storage})

router.post('/createArticle', upload.single('image'), (request, response) => {
	let title	= request.body.title
	let body	= request.body.body
	let date 	= request.body.date
	let img		= "uploads/" + request.file.filename

	db.news.create({
		title: title,
		body: body,
		date: date,
		image: img
	}).then ( newArticle => {
		console.log(newArticle)
		response.redirect('/admin?message=' + encodeURIComponent('Nieuw articel is aangemaakt.'))
	})
})

router.post('/newsArticle', (request, response) => {
	db.news.findAll({
		where: {id: request.body.ID}
	}).then (news => {
		response.render('newsArticle', {news: news, admin: request.session.user})
	})
})

router.post('/goToArticle', (request, response) => {
	db.news.findAll({
		where: {id: request.body.ID}
	}).then (news => {
		response.render('updateArticle', {news: news, admin:request.session.user, message: request.query.message})
	})
})

router.post('/updateArticle', upload.single('image'), (request, response) => {
	let filter 	   = {}
	let attributes = ['id']
	let ID 		   = request.body.id
	let img 	   = "uploads/" + request.file.filename

	if(request.body.title) (filter.title = request.body.title) && (attributes.push('title'))
	if(request.body.body) (filter.body = request.body.body) && (attributes.push('body'))
	if(request.body.date) (filter.date = request.body.date) && (attributes.push('date'))
	if(request.file.filename) (filter.image = img) && (attributes.push('image'))

	db.news.findOne({
		where: {id: ID}, 
		attributes: attributes
	}).then( updateArticle => {
		updateArticle.update(filter
		).then(updateArticle => {
			db.news.findAll({
				where: {id: ID}
			}).then ( news =>{
				response.render('updateArticle', {news: news, message: 'Gegevens zijn aangepast'})
			})
		})
	})
})

// router.post('updateImage', upload.single('image') (request, response) => {
// 	let img	= "uploads/" + request.file.filename

// 	db.user.findOne({
// 		where: {id: request.body.id}
// 	}).then( news => {
// 		news.updateAttributer
// 	})

// })


module.exports = router
