/**
 * control web sockets
 */

import Ws from '@adonisjs/websocket-client';
import { get_my_rooms } from '../services/roomsService';

export class SocketConnection {
    connect () {
      this.ws = Ws('ws://localhost:3333')
                // .withApiToken(token)
                .connect();
  
      this.ws.on('open', () => {
        console.log('Connection initialized')
      });
  
      this.ws.on('close', () => {
        console.log('Connection closed')
      });
  
      return this
    }
  
    subscribe (channel, handler) {
      if (!this.ws) {
        setTimeout(() => this.subscribe(channel), 1000)
      } else {
        const result = this.ws.subscribe(channel);
  
        result.on('message', message => {
          console.log('Incoming', message);
          handler(message)
        });
  
        result.on('error', (error) => {
          console.error(error)
        });
  
        return result
      }
    }
}
  
export default new SocketConnection()
  

/*
class socket {
    constructor() {
        const ws = Ws('ws://localhost:3333');
        ws.connect();

        ws.on('open', () => {
            console.log('Connection initialized open')
            this.connectMyRooms() // conectamos todos los rooms
        })

        ws.on('error', () => {
            console.log('Estoy en error')
        })
        
        ws.on('close', () => {
            console.log('Connection closed')
        });

        this.ws = ws;
        this.chat = ws.subscribe('chat')
        this.room = []
    }

    async connectMyRooms () {
        let self = this;
        let data = await get_my_rooms();
        data.map(function (item) {
            self.room[`room:${item.name}-${item.room_id}`] = self.ws.subscribe(`room:${item.name}-${item.room_id}`)
        })
    }

    emit(event, obj) {
        this.chat.emit(event, obj);
    }

    get_ws () {
        return this.ws;
    }

    onEvent (room) {
        // console.log('this.chat :::::::::' + room)
        // console.log('this.room', this.room[room])
        if (this.room[room]) {
            this.room[room].on('render_message', (obj) => {
                // console.log('render')
                /*let message_history = self.state.content
                message_history.push(left(obj))
                setContent(message_history);
                *
            })
        } 
    }
    
}*/
// export default socket;