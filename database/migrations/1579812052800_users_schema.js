'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.boolean('status', 0).after('show_phone_number').defaultTo(0)
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = UsersSchema
