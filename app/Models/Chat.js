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
  }

  /**
   * Chat's schema
   */
  static get schema () {
    return {
			message: String,
    }
  }
}

module.exports = Chat.buildModel('Chat')
