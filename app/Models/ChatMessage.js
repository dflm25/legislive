'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// const Model = use('Model')
const { Models, Model } = require('./')(config)

class ChatMessage extends Model {
    
}

Models.add('App/Model/ChatMessage', ChatMessage)


module.exports = ChatMessage
