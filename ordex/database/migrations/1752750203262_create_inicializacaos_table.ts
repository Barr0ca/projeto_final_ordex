import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('categoria', (table) => {
      table.increments('id')

      table.string('nome', 150).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.createTable('produtos', (table) => {
      table.increments('id')

      table.string('nome', 150).notNullable()
      table.string('descricao', 254).notNullable()
      table.double('preco').notNullable()
      table.integer('preco').notNullable()
      
      table.integer('categoria_id').unsigned().references('categorias.id').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable('produtos')
  }
}