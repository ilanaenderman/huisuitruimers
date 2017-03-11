// Setup Libraries
const sequelize  = require('sequelize')
const express 	 = require('express')
const bodyParser = require('body-parser')
const pug 		 = require('pug')
const pg 		 = require('pg')
const session 	 = require('express-session')
const bcrypt 	 = require('bcrypt-node')
const Multer	 = require('multer')
const app	 	 = express()

// Requiring Modules
const db 		 = require(__dirname + '/modules/database.js')


// Setting the pug views
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
	secret: 'security is important',
	resave: true,
	saveUninitialized: false
}))


// Initialize Routes
let homeRoute 	= require(__dirname + '/routes/home')
let servicesRoute = require(__dirname +'/routes/services')
let aboutRoute = require(__dirname + '/routes/about')
let contactRoute = require(__dirname + '/routes/contact')	
let newsRoute = require(__dirname + '/routes/news')

app.use(homeRoute)
app.use(servicesRoute)
app.use(aboutRoute)
app.use(contactRoute)


// Listen port 8000
app.listen(8000, () => {
    console.log('Server is running')
})