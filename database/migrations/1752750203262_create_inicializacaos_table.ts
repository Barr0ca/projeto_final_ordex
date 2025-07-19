import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('categorias', (table) => {
      table.increments('id')

      table.string('nome', 100).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.createTable('produtos', (table) => {
      table.increments('id')

      table.string('nome', 150).notNullable()
      table.text('descricao').notNullable()
      table.decimal('preco').notNullable()
      table.integer('quantidade_estoque').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.createTable('categoria_produto', (table) => {
      table.increments('id').primary()

      table
        .integer('categoria_id')
        .unsigned()
        .references('categorias.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('produto_id')
        .unsigned()
        .references('produtos.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.unique(['categoria_id', 'produto_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.createTable('pedidos', (table) => {
      table.increments('id')

      table.enum('status', ['ESPERA', 'ROTA_ENTREGA', 'CANCELADO', 'ENTREGUE']).defaultTo('ESPERA')
      table.decimal('total').notNullable()

      table
        .integer('usuario_id')
        .unsigned()
        .references('usuarios.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.createTable('pagamentos', (table) => {
      table.increments('id')

      table.enum('metodos_pagamento', ['CARTAO_CREDITO', 'PIX', 'BOLETO']).notNullable()
      table.enum('status', ['ESPERA', 'COMPLETO', 'FALHOU']).defaultTo('ESPERA')
      table.decimal('valor_pagamento').notNullable()

      table
        .integer('pedido_id')
        .unsigned()
        .references('pedidos.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.createTable('itens_pedido', (table) => {
      table.increments('id').primary()

      table.integer('quantidade').notNullable()
      table.decimal('preco_unitario').notNullable()

      table
        .integer('pedido_id')
        .unsigned()
        .references('pedidos.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('produto_id')
        .unsigned()
        .references('produtos.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.unique(['pedido_id', 'produto_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.createTable('enderecos_entrega', (table) => {
      table.increments('id')

      table.string('endereco', 255).notNullable()
      table.string('cidade', 100).notNullable()
      table.string('estado', 100).notNullable()
      table.string('caixa_postal', 50).notNullable()
      table.string('pais', 100).notNullable()

      table
        .integer('pedido_id')
        .unsigned()
        .references('pedidos.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('usuario_id')
        .unsigned()
        .references('usuarios.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable('categoria')
    this.schema.dropTable('produtos')
    this.schema.dropTable('categoria_produto')
    this.schema.dropTable('pedidos')
    this.schema.dropTable('pagamentos')
    this.schema.dropTable('itens_pedido')
    this.schema.dropTable('enderecos_entrega')
  }
}
