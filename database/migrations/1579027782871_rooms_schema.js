'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomsSchema extends Schema {
  up () {
    this.create('rooms', (table) => {
      table.increments()
      table.string('name', 255).notNullable().unique()
      table.text('description').notNullable(true)
      table.enu('type', ['Privado', 'Publico']).notNullable(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('rooms')
  }
}

module.exports = RoomsSchema
