'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class Chat
 */
class Chat extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'ChatHook.method')
    // Indexes:
    // this.index({}, {background: true})
    // this._schema.set(option, value)
  }

  static schema () {
    return {
      email: String,
      name: String,
      password: String
    }
  }

  /**
   * Chat's schema
   */
  static get schema () {
    return {
      
    }
  }
}

module.exports = Chat.buildModel('Chat')
