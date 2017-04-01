// Log In Route
const express = require( 'express')
const session = require('express-session')
const bcrypt  = require('bcrypt-node')
const router  = express.Router( )
const db      = require(__dirname + '/../modules/database')


// Get
router.get('/login', (request, response) => {
  response.render('login', {message: request.query.message})
})

// Post
router.post('/login', (request, response) => {
	if(request.body.email.length === 0) {
		response.redirect('/login?message=' + encodeURIComponent("U moet uw emailadres invullen."))
		return
	}

	if(request.body.password.length === 0) {
		response.redirect('/login?message=' + encodeURIComponent("U moet uw paswoord invullen."))
		return
	}

	db.user.findOne({
		where: {
			email: request.body.email
		}
	}).then( (admin) => {
		let hash = admin.password 
		
		if( admin == 0) {
			response.redirect('/login?message=' + encodeURIComponent("U moet een geldig emailadres invullen."))
			return
		}
		else {
			bcrypt.compare(request.body.password, hash, (err, res) => {
				if (admin !== null && res == true) {
					request.session.user = admin
					response.redirect('/admin')
				} 
				else {
					response.redirect('/login?message=' + encodeURIComponent("Uw paswoord of emailadres is niet geldig."))
				}
			})
		}
	})
})

module.exports = router
