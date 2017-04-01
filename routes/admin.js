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


router.post('/admin', (request, response) => {
	db.news.findAll({
		where: {id: request.body.ID}
	}).then( updateNews => {
		response.render('updateAdmin', {updateNews: updateNews})
	})
})


router.post('/updateAdmin', (request, response) => {
	let name 	= request.body.name
	let lastName= request.body.lastName
	let age		= request.body.age
	let location= request.body.location
	let bio		= request.body.bio
	let photo 	= request.body.photo
	
	db.salesman.create({
		name: name,
		lastName: lastName,
		age: age,
		location: location,
		bio: bio,
		photo: photo,
		saleAmount: 0,
		income: 0
	}).then( newProfile => {
		db.salesman.findAll(
			).then( salesman => {
				response.render('administratie', {salesman: salesman, message: "Nieuw profiel toegevoegd."})
			})
	})
})


router.post('/update', (request, response) => {
	let filter 	   = {}
	let attributes = ['id']
	let ID 		   = request.body.salesmanID

	if(request.body.name) (filter.name = request.body.name) && (attributes.push('name'))
	if(request.body.lastName) (filter.name = request.body.lastName) && (attributes.push('lastName'))
	if(request.body.age) (filter.age = request.body.age) && (attributes.push('age'))
	if(request.body.location) (filter.location = request.body.location) && (attributes.push('location'))
	if(request.body.bio) (filter.bio = request.body.bio) && (attributes.push('bio'))
	if(request.body.photo) (filter.photo = request.body.photo) && (attributes.push('photo'))

	db.salesman.findOne({
		where: {id: ID}, 
		attributes: attributes
	}).then( updateFilter => {
		updateFilter.update(filter
		).then( updateSalesman => {
			db.salesman.findAll({
				where: {id: ID}
			}).then( update => {
				response.render('updateAdmin', {update: update, message: 'Gegevens zijn aangepast'})
			})
		})
	})		
})


// Delete Profile
router.post('/delete', (request, response) => {
	let ID = request.body.id

	db.salesman.findOne({
		where: {id: ID}
	}).then( deleteProfile => {
		db.salesman.destroy({
			where: {id: ID}
		}).then( deleteProfile => {
			response.redirect('/administratie?message=' + encodeURIComponent('Profiel is verwijderd.'))
		})
	})
})


router.post('/uploadPhoto', upload.single('photo'), (request, response, next) => {
	let ID = request.body.id
	db.salesman.findOne({
		where: {id: ID}
		}).then( user => {
			user.updateAttributes({
				photo: 'uploads/photo-' + ID
			}).then(photo => {
				db.salesman.findAll({
					where: {id: ID}
				}).then(update => {
					response.render('updateAdmin', {update: update, message3: 'Foto toegevoegd.'})
			})
		})
	})
})

router.post('/photo', upload.single('photo'), (request, response, next) => {
	db.user.findOne({
		where: {id: request.session.user.id}
	}).then( user => {
		user.updateAttributes({
			photo: 'uploads/photo-' + request.session.user.id
		})
		response.redirect('/photo?message=' + encodeURIComponent('Your picture has been changed.'))
	})
})



module.exports = router