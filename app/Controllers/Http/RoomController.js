'use strict'

const Database = use('Database')
const { validateAll } = use('Validator')

class RoomController {

    async getAll({ request, auth, response }) 
    {    
        let publico = await Database.from('rooms').where('type', 'Publico');
        let privado = await Database.from('rooms').where('type', 'Privado');
        let selected = await Database.from('user_rooms').where('user_id', auth.user.id)
                             .innerJoin('rooms', 'rooms.id', '=', 'user_rooms.room_id')
                             .select('user_rooms.room_id', 'rooms.name', 'user_id');

        return response.json({ public: publico, private: privado, selected: selected })
    }

    async getRoomById ({ request, auth, response }) {
        let { id } = request.all()

        let data = await Database.from('rooms').where({ 'user_id': auth.user.id, 'rooms.id': id })
                        .innerJoin('user_rooms', 'rooms.id', '=', 'user_rooms.room_id')
                        .first('user_rooms.room_id', 'rooms.name', 'user_id')

        return response.json(data)
    }

    async getMyRooms ({ request, auth, response }) {
        let selected = await Database.from('rooms').where('user_id', auth.user.id)
                             .innerJoin('user_rooms', 'rooms.id', '=', 'user_rooms.room_id')
                             .select('user_rooms.room_id', 'rooms.name');
        
        return response.json(selected)
    }

    async updateRoomStatus({ request, auth, response }) 
    {   
        let selected;
        const { status, id } = request.all()
        if (status) {
            selected = await Database.insert({ 'user_id': auth.user.id, 'room_id': id }).into('user_rooms')
        } else {
            selected = await Database.table('user_rooms').where({ 'user_id': auth.user.id, 'room_id': id }).delete()
        }
        return response.json({ msg: 'Información actualizada correctamente', type: 'success', selected: selected })
    }

    async saveRoom({ request, auth, response }) 
    {   
        let selected;
        const { name, type, tags } = request.all();
        const rules = {
            name: 'required|unique:rooms',
            type: 'required'
        }

        const validation = await validateAll(request.all(), rules)
        if (validation.fails()) {
            return response.json({ msg: 'Algunos errores en el formulario', type: 'error', errors: validation.messages() })    
        } else {
            // Guardamos informacion del room
            let lastId = await Database.insert({ 'name': name, 'type': type, invited: tags.join() }).into('rooms');
            // Relacionamos el usuario al room
            await Database.insert({ 'user_id': auth.user.id, 'room_id': lastId }).into('user_rooms');
        }
        return response.json({ msg: 'Room creado correctamente', type: 'success', errors: [] })
    }

}

module.exports = RoomController
