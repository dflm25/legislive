'use strict'

// const ChatMessage = use('App/Models/ChatMessage')
const moment = require('moment');

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    // console.log('A new subscription for room topic : ' + this.socket.id /*, socket.topic*/)
  }

  onMessage (data) {
    let time = moment().format('YYYY-MM-DD h:mm:ss a');
    this.socket.broadcastToAll('render_message', { message: data.message, user: data.user, time });
    // ChatMessage.insert({ message: message, user: user, time: time })
  }

  onClose () {
    // same as: socket.on('close')
    console.log('close', this.socket.id);
  }

  onError () {
    // same as: socket.on('error')
    console.log('error', this.socket.id);
  }
}

module.exports = ChatController
