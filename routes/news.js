// Home Route
const express = require( 'express')
const session = require('express-session')
const router  = express.Router( )
const db      = require(__dirname + '/../modules/database')


// GET Show three newest salesman
router.get('/news', (request, response) => {
	db.news.findAll().then( news => {
		response.render('news', {news: news, admin: request.session.user})
	})
})

module.exports = router
