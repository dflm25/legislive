'use strict'

const Database = use('Database')
const { validate } = use('Validator')

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
        const { name, tags } = request.all();
        const rules = {
            name: 'required|unique:rooms'
        }

        const validation = await validateAll(request.all(), rules)
        if (validation.fails()) {
            return response.json({ msg: 'Algunos errores en el formulario', type: 'error', errors: validation.messages() })    
        } else {
            await Database.insert({ 'name': name, 'type': 'Privado' }).into('rooms')
        }
        return response.json({ msg: 'Información actualizada correctamente', type: 'success', errors: [] })
    }

}

module.exports = RoomController
