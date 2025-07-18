import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class EnderecoEntrega extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare endereco: string

  @column()
  declare cidade: string

  @column()
  declare estado: string

  @column()
  declare caixaPostal: string

  @column()
  declare pais: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
