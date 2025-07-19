import Pagamento from '#models/pagamento'
import type { HttpContext } from '@adonisjs/core/http'

export default class PagamentosController {
  async index({}: HttpContext) {
    return await Pagamento.all()
  }

  async store({ request }: HttpContext) {
    return await Pagamento.create(
      request.only(['metodosPagamento', 'status', 'valorPagamento', 'pedidoId'])
    )
  }

  async show({ params }: HttpContext) {
    return await Pagamento.findOrFail(params.id)
  }

  // async update({ params, request }: HttpContext) {}

  // async destroy({ params }: HttpContext) {}
}
