'use strict'

const User = use('App/Models/User')

class UserController {

    // index

    async login ({ auth, request }) {
        const { email, password } = request.all()
        await auth.attempt(email, password)

        return 'Logged in successfully'
    }

    show ({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
            return "You cannot see someone else's profile"
        }
        return auth.user
    }

    async updateStatus ({ auth, request, response }) {
        const { status } = request.all()
        let resp = await User.query().where('id', auth.user.id).update({ status: status });
        return response.json(resp)
    }
}

module.exports = UserController