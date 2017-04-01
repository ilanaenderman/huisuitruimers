//Logout Routes

const express 	= require( 'express')
const router	= express.Router( )
const db		= require(__dirname + '/../modules/database')


// GET
router.get('/logout',  (request, response)  => {
	request.session.destroy( (error) => {
		if(error) {
			throw error
		}
		response.redirect('/login');
	})
});

module.exports = router