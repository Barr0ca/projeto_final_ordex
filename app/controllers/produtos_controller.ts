import type { HttpContext } from '@adonisjs/core/http'
import Produto from '#models/produto'

export default class ProdutosController {
  public async index({}: HttpContext) {
    return await Produto.query().preload('categoria')
  }

  public async show({ params }: HttpContext) {
    return await Produto.query().where('id', params.id).preload('categoria').firstOrFail()
  }

  public async store({ request }: HttpContext) {
    return await Produto.create(request.only(['nome', 'descricao', 'preco', 'quantidadeEstoque']))
  }

  public async update({ request, params }: HttpContext) {
    const produto = await Produto.findOrFail(params.id)
    produto.merge(request.only(['nome', 'descricao', 'preco', 'quantidadeEstoque']))
    return await produto.save()
  }

  public async destroy({ params }: HttpContext) {
    const produto = await Produto.findOrFail(params.id)
    await produto.delete()
    return { message: 'Produto deletado com sucesso.' }
  }
}
