'use strict'
const moment = require('moment');

class RoomController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    // console.log('A new subscription for request :::::::::::::::::::::::::: ' + socket.topic)
    // console.log('A new subscription for socket :::::::::::::::::::::::::: ' + socket.params)
  }

  onClose () {    
    // console.log('close room:::::::::::::::::::::::::::::::::::::::::::: ', this.socket.id);
  }

  onMessage (data) {
    let time = moment().format('YYYY-MM-DD h:mm:ss a');
    this.socket.broadcastToAll('render_message', { message: data.message, user: data.user, time });
  }

  onError () {
    console.log('error room', this.socket.id);
  }
}

module.exports = RoomController
