// Home Route
const express = require( 'express')
const session = require('express-session')
const router  = express.Router( )
const db      = require(__dirname + '/../modules/database')


// GET Show three newest salesman
router.get('/about', (request, response) => {
  response.render('about')
})

module.exports = router
