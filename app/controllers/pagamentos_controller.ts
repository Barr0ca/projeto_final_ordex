import type { HttpContext } from '@adonisjs/core/http'
import Pagamento from '#models/pagamento'

export default class PagamentosController {
  public async index({}: HttpContext) {
    return await Pagamento.all()
  }

  public async show({ params }: HttpContext) {
    return await Pagamento.findOrFail(params.id)
  }

  public async store({ request }: HttpContext) {
    return await Pagamento.create(
      request.only(['metodosPagamento', 'status', 'valorPagamento', 'pedidoId'])
    )
  }

  public async update({ request, params }: HttpContext) {
    const pagamento = await Pagamento.findOrFail(params.id)
    pagamento.merge(request.only(['metodosPagamento', 'status', 'valorPagamento', 'pedidoId']))
    return await pagamento.save()
  }

  public async destroy({ params }: HttpContext) {
    const pagamento = await Pagamento.findOrFail(params.id)
    await pagamento.delete()
    return { message: 'Pagamento deletado com sucesso.' }
  }
}
