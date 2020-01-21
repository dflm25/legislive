/**
 * control web sockets
 */

import Ws from '@adonisjs/websocket-client';
import { get_my_rooms } from '../services/roomsService';

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
        this.all = ws.subscribe('room:*')
        console.log('this.all', this.all)
    }

    async connectMyRooms () {
        let self = this;
        let data = await get_my_rooms();
        data.map(function (item) {
            self.ws.subscribe(`room:${item.name}-${item.room_id}`)
        })
    }

    emit(event, obj) {
        this.chat.emit(event, obj);
    }

    get_ws () {
        return this.ws;
    }
}

export default socket;