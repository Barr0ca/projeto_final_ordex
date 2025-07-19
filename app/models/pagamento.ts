import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

enum MetodoPagamento {
  CARTAO_CREDITO = 'CARTAO_CREDITO',
  PIX = 'PIX',
  BOLETO = 'BOLETO',
}

enum Status {
  ESPERA = 'ESPERA',
  COMPLETO = 'COMPLETO',
  FALHOU = 'FALHOU',
}

export default class Pagamento extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare metodosPagamento: MetodoPagamento

  @column()
  declare status: Status

  @column()
  declare valorPagamento: number

  @column()
  declare pedidoId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
