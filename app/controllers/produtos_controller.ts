import type { HttpContext } from '@adonisjs/core/http'
import Produto from '#models/produto'

export default class ProdutosController {
  public async index({}: HttpContext) {
    return await Produto.all()
  }
  public async show({ params }: HttpContext) {
    return await Produto.findOrFail(params.id)
  }
  public async store({ request }: HttpContext) {
    return await Produto.create(request.only(['nome', 'descricao', 'preco', 'quantidadeEstoque']))
  }
  public async update({ request, params }: HttpContext) {
    const produto = await Produto.findOrFail(params.id)
    produto.merge(request.only(['nome', 'descricao', 'preco', 'quantidadeEstoque']))
    await produto.save()
    return produto
  }
  public async destroy({ params }: HttpContext) {
    const produto = await Produto.findOrFail(params.id)
    await produto.delete()
    return produto
  }
}
