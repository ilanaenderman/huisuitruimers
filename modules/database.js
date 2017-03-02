// DB Object
const db = { }


// Setup SQL
const sequelize = require( 'sequelize' )
const bcrypt 	= require('bcrypt-node')

db.conn = new sequelize('straatjournaal', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
})


// Models
// db.body = db.conn.define('body', {
	
// })

db.user = db.conn.define('user', {
	email: sequelize.STRING,
	password: sequelize.STRING
})


// Define relationships
// db.salesman.hasMany(db.sale)
// db.sale.belongsTo(db.salesman)

// Create test user
db.conn.sync({force: true}).then( database => {
	bcrypt.hash('password', null, null, (err, hash) => {
		db.user.create({
			email: 'info@dehuisuitruimers.com',
			password: hash
		})
	})
})

// Export
module.exports = db