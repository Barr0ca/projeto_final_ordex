import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Categoria from '#models/categoria'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Pedido from '#models/pedido'

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
  declare quantidadeEstoque: number

  @manyToMany(() => Categoria, {
    pivotTable: 'categoria_produto',
  })
  declare categoria: ManyToMany<typeof Categoria>

  @manyToMany(() => Pedido, {
    pivotTable: 'itens_pedido',
    pivotColumns: ['quantidade', 'preco_unitario'],
    pivotTimestamps: true,
  })
  declare pedido: ManyToMany<typeof Pedido>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
