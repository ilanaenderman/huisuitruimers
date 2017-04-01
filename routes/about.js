// Home Route
const express = require( 'express')
const session = require('express-session')
const router  = express.Router( )
const db      = require(__dirname + '/../modules/database')


// GET Show three newest salesman
router.get('/about', (request, response) => {
	db.user.findOne({
		where: {id: 1}
	}).then( ruud => {
		db.user.findOne({
			where: {id: 2}
		}).then( erwin => {
			response.render('about', {ruud: ruud, erwin: erwin, admin: request.session.user})
		})
	})
})

module.exports = router
