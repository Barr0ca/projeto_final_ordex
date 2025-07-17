import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Categoria from '#models/categoria'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare descricao: string

  @column()
  declare preco: number

  @column()
  declare quatidade_estoque: number

  @manyToMany(() => Categoria, {
    pivotTable: 'categoria_produto',
  })
  declare categoria: ManyToMany<typeof Categoria>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
