const deserializeMessage = require("./deserialize-message")

const getLastMessageSql = 'SELECT * FROM get_last_stream_message($1)'
const getCategoryMessageSql = 'SELECT * FROM get_category_messages($1, $2, $3)'
const getStreamMessageSql = 'SELECT * FROM get_stream_messages($1, $2, $3)'

function createRead ({ db }) {
    function readLastMessage (streamName) {
        return db.query(getLastMessageSql, [ streamName ])
            .then(res => deserializeMessage(res.rows[0]))
    }

    function read (streamName, fromPosition = 0, maxMessages = 1000) {
        let query = null
        let values = []

        if (streamName.includes('-')) {
            // entity stream names have a dash
            query = getStreamMessageSql
            values = [streamName, fromPosition, maxMessages]
        } else {
            query = getCategoryMessageSql
            values = [streamName, fromPosition, maxMessages]
        }

        return db.query(query, values)
            .then(res => res.rows.map(deserializeMessage))
    }

    function fetch (streamName, projection) {
        return read(streamName).then(messages => projection(messages, projection))
    }

    function project (events, projection) {
        return events.reduce((entity, event) => {
            if (!projection[event.type]) {
                return entity
            }

            return projection[entity.type](entity, event)
        }, projection.$init())
    }

    return {
        read,
        readLastMessage,
        fetch
    }
    
}

module.exports = exports = createRead