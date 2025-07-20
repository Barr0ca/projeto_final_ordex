import type { HttpContext } from '@adonisjs/core/http'
import Categoria from '#models/categoria'

export default class CategoriaProdutosController {
  async associarProduto({ params, request }: HttpContext) {
    const categoria = await Categoria.findOrFail(params.id)

    await categoria?.related('produto').attach(request.input('produto'))
    await categoria?.load('produto')
    return categoria
  }
}
