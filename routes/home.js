// Home Route
const express = require( 'express')
const session = require('express-session')
const router  = express.Router( )
const db      = require(__dirname + '/../modules/database')


// GET Show three newest salesman
router.get('/', (request, response) => {
	db.news.max('id').then(max => { 
		let maxId = max
		db.news.findOne({
			where: {id: maxId},
			attributes: ['id', 'title', 'date', 'image']
		}).then(news => {
			response.render('home', {news: news, admin: request.session.user})
		})
	})
})

module.exports = router
