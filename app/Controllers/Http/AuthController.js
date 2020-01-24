'use strict'

const User = use('App/Models/User');
const Helpers = use('Helpers')
const Drive = use('Drive')
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

    async me({request, auth, response}) {
      let resp = await User.find(auth.user.id)
      return response.json(resp)
    }

    async updateMe({request, auth, response}) {
      let { username, email, phone, position, webpage, twitter, linkedin, description } = request.all()
      let resp = await User.query().where('id', auth.user.id).update({ username, phone, email, position, webpage, twitter, linkedin, description })
      return response.json(resp)
    }

    async updatePhoto({request, auth, response}) {
      let fileName = `${new Date().getTime()}.${profilePic.subtype}`;
      const profilePic = request.file('file', {
        types: ['image'],
        size: '2mb'
      })
    
      await profilePic.move(Helpers.publicPath('uploads/profiles'), {
        name: fileName,
        overwrite: true
      })
      
      if (!profilePic.moved()) {
        return profilePic.error()
      } else {
        await User.query().where('id', auth.user.id).update({ picture: fileName })
      }

      return response.json('File uploaded') 
    }
    

}

module.exports = AuthController