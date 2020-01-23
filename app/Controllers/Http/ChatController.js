'use strict'

const Chat = use('App/Models/Chat')
const Ws = use('Ws')

class ChatController {

    async createMessage({ request, auth, response }) 
    {
        const { body, name, room_id, user } = request.all();
        const message = await Chat.create({ message: body, user: user, room: { room_id: room_id, name: name } })
        const topic = Ws.getChannel('room:*').topic(`room:${name}-${room_id}`)

        if(topic) {
            topic.broadcastToAll('message', message);
        }
        return response.json({ msg: 'messages sent', 'type': 'success' })
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
