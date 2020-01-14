'use strict'

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    console.log('A new subscription for room topic : ' + this.socket.id /*, socket.topic*/)
  }

  onMessage (message) {
    // same as: socket.on('message')
    this.socket.broadcastToAll('message', message);
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
