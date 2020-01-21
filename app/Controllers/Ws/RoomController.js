'use strict'

class RoomController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    // console.log('A new subscription for request :::::::::::::::::::::::::: ' + socket.topic)
    // console.log('A new subscription for socket :::::::::::::::::::::::::: ' + socket.params)
  }

  onClose () {    
    console.log('close room:::::::::::::::::::::::::::::::::::::::::::: ', this.socket.id);
  }

  onMessage (data) {
    // console.log('data:::::::::::::::::::::::::::::::::::::::::::::::::::' + this.socket.topic, data);
    console.log(this.socket);
  }

  onError () {
    console.log('error room', this.socket.id);
  }
}

module.exports = RoomController
