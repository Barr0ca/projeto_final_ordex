import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Pedido from '#models/pedido'
import EnderecoEntrega from '#models/endereco_entrega'
import type { HasMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'senha',
})

export default class Usuario extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare senha: string

  @hasMany(() => Pedido)
  declare pedido: HasMany<typeof Pedido>

  @hasMany(() => EnderecoEntrega)
  declare enderecoEntrega: HasMany<typeof EnderecoEntrega>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(Usuario)
}
