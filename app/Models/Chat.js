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
      room: {},
      message: String,
      user: {},
      type: {
        type: String,
        enum: ['text', 'html'],
				default: 'text'
    	},
    }
  }
}

module.exports = Chat.buildModel('Chat')
