'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.uuid('uid')
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.text('description').notNullable(true)
      table.text('twitter').notNullable(true)
      table.text('linkedin').notNullable(true)
      table.string('location', 255).notNullable(true)
      table.string('position', 255).notNullable(true)
      table.string('webpage', 255).notNullable(true)
      table.string('phone', 255).notNullable(true)
      table.boolean('show_phone_number').defaultTo(0)

      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
