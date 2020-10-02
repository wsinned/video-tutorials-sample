const createExpressApp = require('./app/express')
const createConfig = require('./config')
const env = require('./env')

const config = createConfig({ env })
const app = createExpressApp({ config, env })

function start () {
    app.listen(env.port, signalAppStart)
}

function signalAppStart () {
    console.log(`${env.appName} started at ${new Date()}`)
    console.table([['Port', env.port], ['Environent', env.env]])
}

module.exports = {
    app,
    config,
    start
}
