import Produto from '#models/produto'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProdutosController {
  async index({}: HttpContext) {
    return await Produto.query().preload('categoria')
  }

  async store({ request }: HttpContext) {
    return await Produto.create(request.only(['nome', 'descricao', 'preco', 'quantidadeEstoque']))
  }

  async show({ params }: HttpContext) {
    return await Produto.findOrFail(params.id)
  }

  // async update({ params, request }: HttpContext) {}

  // async destroy({ params }: HttpContext) {}
}
