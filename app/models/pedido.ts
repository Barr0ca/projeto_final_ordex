import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Pagamento from '#models/pagamento'
import Produto from '#models/produto'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

enum Status {
  'ESPERA',
  'ROTA_ENTREGA',
  'CANCELADO',
  'ENTREGUE',
}

export default class Pedido extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare status: Status

  @column()
  declare total: number

  @hasMany(() => Pagamento)
  declare pagamento: HasMany<typeof Pagamento>

  @manyToMany(() => Produto, {
    pivotTable: 'itens_pedido',
    pivotColumns: ['quantidade', 'preco_unitario'],
    pivotTimestamps: true,
  })
  declare produto: ManyToMany<typeof Produto>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
