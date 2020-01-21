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
      table.text('description').nullable(true)
      table.text('twitter').nullable(true)
      table.text('linkedin').nullable(true)
      table.string('location', 255).nullable(true)
      table.string('position', 255).nullable(true)
      table.string('webpage', 255).nullable(true)
      table.string('phone', 255).nullable(true)
      table.boolean('show_phone_number').defaultTo(0)

      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
