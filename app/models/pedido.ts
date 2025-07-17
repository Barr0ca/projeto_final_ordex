import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Pagamento from '#models/pagamento'
import type { HasMany } from '@adonisjs/lucid/types/relations'

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
