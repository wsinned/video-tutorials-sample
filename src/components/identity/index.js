const Bluebird = require("bluebird")


function createIdentityCommandHandlers ({ messageStore }) {
    return {
        Register: command => {
            const context = {                 
            }

            return Bluebird.resolve(context)
                .then(loadIdentity)
                .then(ensureNotRegistered)
                .then(writeRegisteredEvent)
                .catch(AlreadyRegisteredError, () => {})
        }
    }
}

function build ({ messageStore }) {
    const identityCommandHandlers = 
        createIdentityCommandHandlers({ messageStore })
    const identityCommandSubscription = messageStore.createSubscription({
        streamName: 'identity:command',
        handlers: identityCommandHandlers,
        subscriberId: 'components:identity:command'
    })



}

function start () {
    identityCommandSubscription.start()
}

module.exports = build
