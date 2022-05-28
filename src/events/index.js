
module.exports = {
    connection: require('./connection.update'),
    creds: require('./creds.update'),
    messages: require('./messages.upsert'),
    chats: require('./chats.update'),
    group_participants: require('./group-participants.update')
}