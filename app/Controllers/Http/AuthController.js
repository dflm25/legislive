'use strict'

const User = use('App/Models/User');
const { validateAll } = use('Validator');

class AuthController {

    /**
     * 
     * @param {*} request 
     */
    async register({ request, auth, response }) {
        
        const rules = {
            email: 'required|email|unique:users,email',
            password: 'required|min:7|confirmed'
        }

        const validation = await validateAll(request.all(), rules)

        if (validation.fails()) {
            return response.status(400).json({ 
                type: 'validation', 
                msg: 'Form validation error', 
                errors: validation.messages()
            })
        }

        let user = await User.create(request.only(['username', 'email', 'password']))

        //generate token for user;
        let token = await auth.generate(user)
        Object.assign(user, token)

        return response.json(user)
    }

    /**
     * 
     * @param {*} request 
     */
    async login({request, auth, response}) {

        let { email, password } = request.all();

        try {
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            let token = await auth.generate(user)

            Object.assign(user, token)
            return response.status(200).json(user)
          }
        }
        catch (e) {
          console.log(e)
          return response.json({ message: 'You are not registered!' })
        }
    }

}

module.exports = AuthController