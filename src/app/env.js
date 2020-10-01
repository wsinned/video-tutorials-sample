function requireFromEnv (key) {
    if (!process.env[key]) {
      // eslint-disable-next-line no-console
      console.error(`${colors.red('[APP ERROR] Missing env variable:')} ${key}`)
  
      return process.exit(1)
    }
  
    return process.env[key]
}  

module.exports = {
    appName: requireFomEnv('APP_NAME'),
    env: requireFomEnv('NODE_ENV'),
    port: parseInt(requireFomEnv('PORT'), 10),
    version: packageJson.version
}
``