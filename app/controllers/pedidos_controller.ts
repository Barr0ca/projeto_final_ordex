import Pedido from '#models/pedido'
import type { HttpContext } from '@adonisjs/core/http'

export default class PedidosController {
  async index({}: HttpContext) {
    return await Pedido.query()
      .preload('produto', (query) => query.pivotColumns(['quantidade', 'preco_unitario']))
      .preload('pagamento')
      .preload('enderecoEntrega')
  }

  async store({ request }: HttpContext) {
    return await Pedido.create(request.only(['status', 'total', 'usuarioId']))
  }

  async show({ params }: HttpContext) {
    return await Pedido.findOrFail(params.id)
  }

  async update({ params, request }: HttpContext) {
    const pedido = await Pedido.findOrFail(params.id)
    return await pedido.merge(request.only(['status', 'total', 'usuarioId'])).save()
  }

  async destroy({ params }: HttpContext) {
    const pedido = await Pedido.findOrFail(params.id)
    await pedido.delete()
  }
}
