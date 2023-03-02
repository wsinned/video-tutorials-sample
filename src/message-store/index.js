const createWite = require('./write')
const createRead = require('./read')
const configureCreateSubscription = require('./subscribe')
const VersionConflictError = require('./version-conflict-error')

function createMessageStore ({ db }) {
    const write = createWite({ db })
    const read = createRead({ db })
    const createSubscription = configureCreateSubscription({
        read: read.read,
        readLastMessage: read.readLastMessage,
        write: write
    })

    return {
        write: write,
        createSubscription,
        read: read.read,
        readLastMessage: read.readLastMessage,
        fetch: read.fetch,
    }
}

module.exports = exports = createMessageStore
exports.project = createRead.project
exports.VersionConflictError = VersionConflictError
