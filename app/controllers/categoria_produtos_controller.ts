import Categoria from '#models/categoria'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriaProdutosController {
  async associarCategoriaProdutos({ params, request }: HttpContext) {
    const categoria = await Categoria.findOrFail(params.id)

    await categoria.related('produto').attach(request.input('produto'))
    await categoria.load('produto')
    return categoria
  }

  async desassociarCategoriaProdutos({ params, request }: HttpContext) {
    const categoria = await Categoria.findOrFail(params.id)

    await categoria.related('produto').detach(request.input('produto'))
    await categoria.load('produto')
    return categoria
  }
}
