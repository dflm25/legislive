'use strict'

const Chat = use('App/Models/Chat')
const Ws = use('Ws')

class ChatController {

    async createMessage({ request, auth, response }) 
    {
        let { body } = request.all();
        const message = await Chat.create({ message: body })
        // console.log('message', message);

        return response.json('message')
    }

    // Broadcast messages
    broadcast (id, type, data) 
    {
        const channel = Ws.getChannel('room:*')
        if (!channel) return

        const topic = channel.topic(`room:${id}`)
        if (!topic) {
            console.error('Has no topic')
            return
        }

        // emit, broadcast, broadcastToAll
        topic.broadcastToAll(`message`, {
            type,
            data
        });
    }

}

module.exports = ChatController
