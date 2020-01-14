'use strict'

const Room = use('App/Models/Room');

class RoomController {

    async getAll({ request, auth, response }) 
    {    
        let room = await Room.all()
        return response.json(room)
    }

}

module.exports = RoomController
