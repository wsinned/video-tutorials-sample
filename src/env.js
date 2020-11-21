const colors = require('colors')
const packageJson = require('../package.json')

function requireFromEnv (key, defaultValue) {
    if (!process.env[key]) {
      // eslint-disable-next-line no-console
      const errorMessage = `${colors.red('[APP ERROR] Missing env variable:')} ${key}`
      const defaultMessage = `${colors.yellow('Using default value:')} ${defaultValue}`
      const message = errorMessage + ' : ' + defaultMessage
      console.error(message)
  
      return defaultValue
    }
  
    return process.env[key]
}  

module.exports = {
    appName: requireFromEnv('APP_NAME', 'FirstPass'),
    databaseUrl: requireFromEnv('DATABASE_URL'),
    messageStoreConnectionString: requireFromEnv('MESSAGE_STORE_CONNECTION_STRING'),
    env: requireFromEnv('NODE_ENV', 'dev'),
    port: parseInt(requireFromEnv('PORT', '8080'), 10),
    version: packageJson.version
}
