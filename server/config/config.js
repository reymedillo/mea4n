module.exports = {
	development: {
		db: 'mongodb://localhost:27017/dev_clientportal',
		port: process.env.PORT || 3030,
		external_api: {
			host: 'devapi.zylun.com',
			port: 8087,
			path: '/'
		}
	},
	production: {
		db: 'mongodb://localhost:27017/clientportal',
		port: process.env.PORT || 3031,
		external_api: {
			host: 'api.zylun.com',
			port: 8086,
			path: '/'
		}
	}
}
