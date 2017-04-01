// DB Object
const db = { }


// Setup SQL
const sequelize = require( 'sequelize' )
const bcrypt 	= require('bcrypt-node')

db.conn = new sequelize('straatjournaal', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
})

db.news	= db.conn.define('news', {
	title: sequelize.STRING,
	body: sequelize.TEXT,
	date: sequelize.STRING,
	image: sequelize.STRING
})

db.user = db.conn.define('user', {
	name: sequelize.STRING,
	info: sequelize.TEXT,
	image: sequelize.STRING,
	email: sequelize.STRING,
	password: sequelize.STRING
})


// Create test user/news
db.conn.sync({force: true}).then( database => {
	bcrypt.hash('Enschede2017', null, null, (err, hash) => {
		db.user.create({
			name: 'Ruud Klok',
			info: 'Ik ben Ruud Klok, geboren in Amsterdam maar opgegroeid in Haarlem. Door uitgebreid ervaring te hebben opgedaan in verhuizen, verbouwen en ook het ontruimen van woningen van familieleden ben ik er achter gekomen dat je geen behoefte hebt aan veel rompslomp, het moet gewoon geregeld worden. Vaak moet je zelf aan de slag, vrije dagen opnemen om alles te regelen en vaak ook nog op te korte termijn. Vandaar dat Erwin en ik hier wat aan willen doen. In onze zoektocht naar een nieuwe uitdaging hebben wij onze krachten te gebundeld in “De Huisuitruimers”. Een bedrijf waar onze werkervaring en het aanbieden van een helpende hand bij elkaar komen. Dat is de kracht van ons bedrijf.',
			image: '/images/ruud.jpg',
			email: 'info@dehuisuitruimers.nl',
			password: hash
		})

		db.user.create({
			name: 'Erwin Prins',
			info: 'Ik ben Erwin Prins, geboren en getogen Haarlemmer. De afgelopen jaren heb ik veel ervaring opgedaan met het ontruimen en verbouwen van woningen en bedrijven. Al langere tijd liep ik rond met het idee om met deze ervaringen wat te doen. Ruud bleek met dezelfde wensen en ideeën rond te lopen en al gauw was de samenwerking een feit. Door onze persoonlijke en doelgerichte aanpak kunnen wij voor u het verschil maken en een deel van zorg wegnemen in een drukke en hectische periode bij verhuizing of overlijden van een dierbare. De Huisuitruimers bieden u een veelzijdig pakket van werkzaamheden aan. Informeer vrijblijvend naar alle mogelijkheden.',
			image: '/images/erwin.jpg',
			email: 'info@dehuisuitruimers.nl',
			password: hash
		})

		db.news.create({
			title: 'Samenwerking en duurzaamheid',
			body: 'Wij vinden het belangrijk dat de uitruiming discreet, netjes en respectvol gebeurd. Daarnaast hechten wij ook waarde aan het hergebruiken van spullen waar mogelijk.  Daarom zullen wij ook veel samenwerken met kringloopwinkels, waaronder RataPlan en ReShare. RataPlan heeft als missie om mensen en milieu een kans te geven. Dit doen zij door het aanbieden van werk aan mensen met een afstand tot de arbeidsmarkt en het hergebruik van goederen om verspilling tegen te gaan. ReShare werkt samen met het Leger des Heils en verzamelt onder andere kleding om her te verdelen, zowel in ontwikkelingslanden als binnen Nederland.',
			date: '31 maart 2017',
			image: '/images/recycle.jpg'
		})
	})
})

// Export
module.exports = db