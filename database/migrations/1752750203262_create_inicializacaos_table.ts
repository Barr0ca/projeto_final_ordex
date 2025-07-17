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
      table.integer('qtd_estoque').notNullable()

      table.integer('categoria_id').unsigned().references('categorias.id').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.createTable('pedidos', (table) => {
      table.increments('id')

      table.enum('status', ['ESPERA', 'ROTA_ENTREGA', 'CANCELADO', 'ENTREGUE']).notNullable()
      table.decimal('total').notNullable()

      table.integer('usuario_id').unsigned().references('usuarios.id').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.createTable('pagamentos', (table) => {
      table.increments('id')

      table.enum('metodos_pagamento', ['CARTAO_CREDITO', 'PIX', 'BOLETO']).notNullable()
      table.enum('status', ['ESPERA', 'COMPLETO', 'FALHOU']).notNullable()
      table.decimal('valor_pagamento').notNullable()

      table.integer('pedido_id').unsigned().references('pedidos.id').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.createTable('itens_pedido', (table) => {
      table.increments('id')

      table.integer('quantidade').notNullable()
      table.decimal('preco_unitario').notNullable()

      table.integer('pedido_id').unsigned().references('pedidos.id').notNullable()
      table.integer('produto_id').unsigned().references('produtos.id').notNullable()

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

      table.integer('pedido_id').unsigned().references('pedidos.id').notNullable()
      table.integer('usuario_id').unsigned().references('usuarios.id').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable('categoria')
    this.schema.dropTable('produtos')
    this.schema.dropTable('pedidos')
    this.schema.dropTable('pagamentos')
    this.schema.dropTable('itens_pedido')
    this.schema.dropTable('enderecos_entrega')
  }
}
