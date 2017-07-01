module.exports = {
	development: {
		db: 'mongodb://localhost:27017/dev_clientportal',
		port: process.env.PORT || 3030
	},
	production: {
		db: 'mongodb://localhost:27017/clientportal',
		port: process.env.PORT || 3031
	}
}
