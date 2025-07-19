import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Pagamento from '#models/pagamento'
import Produto from '#models/produto'
import EnderecoEntrega from '#models/endereco_entrega'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

enum Status {
  ESPERA = 'ESPERA',
  ROTA_ENTREGA = 'ROTA_ENTREGA',
  CANCELADO = 'CANCELADO',
  ENTREGUE = 'ENTREGUE',
}

export default class Pedido extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare status: Status

  @column()
  declare total: number

  @column()
  declare usuarioId: number

  @hasMany(() => Pagamento)
  declare pagamento: HasMany<typeof Pagamento>

  @manyToMany(() => Produto, {
    pivotTable: 'itens_pedido',
    pivotColumns: ['quantidade', 'preco_unitario'],
    pivotTimestamps: true,
  })
  declare produto: ManyToMany<typeof Produto>

  @hasMany(() => EnderecoEntrega)
  declare enderecoEntrega: HasMany<typeof EnderecoEntrega>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
