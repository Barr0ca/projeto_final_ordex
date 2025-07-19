import type { HttpContext } from '@adonisjs/core/http'
import Produto from '#models/produto'

export default class CategoriaProdutosController {
  async associarProduto({ params }: HttpContext) {
    const produto = await Produto.find(params.id)

    await produto?.related('categoria').attach([produto.id])
  }
}
