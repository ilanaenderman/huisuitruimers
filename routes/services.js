// Home Route
const express = require( 'express')
const session = require('express-session')
const router  = express.Router( )
const db      = require(__dirname + '/../modules/database')


// GET Show three newest salesman
router.get('/services', (request, response) => {
  response.render('services', {admin: request.session.user})
})

module.exports = router
