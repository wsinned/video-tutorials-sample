const createExpressApp = require("./app/express")

function createConfig ( {env} ) {
    return {
        env,
    }
}

module.exports = createConfig