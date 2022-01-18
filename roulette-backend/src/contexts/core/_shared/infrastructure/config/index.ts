import convict from 'convict'

const coreConfig = convict({
	env: {
		doc: 'The application environment.',
		format: ['production', 'development', 'staging', 'test'],
		default: 'default',
		env: 'NODE_ENV'
	},
	mongo: {
		url: {
			doc: 'The Mongo connection URL',
			format: String,
			env: 'MONGO_URL',
			default: 'mongodb://localhost:27017/core-backend-dev'
		}
	},
})

coreConfig.loadFile([__dirname + '/default.json', __dirname + '/' + coreConfig.get('env') + '.json'])

export default coreConfig
