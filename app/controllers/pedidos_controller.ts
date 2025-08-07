import Pedido from '#models/pedido'
import { createPedidoValidator, updatePedidoValidator } from '#validators/pedido'
import type { HttpContext } from '@adonisjs/core/http'

export default class PedidosController {
  async index({}: HttpContext) {
    return await Pedido.query()
      .preload('produto', (query) => query.pivotColumns(['quantidade', 'preco_unitario']))
      .preload('pagamento')
      .preload('enderecoEntrega')
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPedidoValidator)
    return await Pedido.create(payload)
  }

  async show({ params }: HttpContext) {
    return await Pedido.query()
      .where('id', params.id)
      .preload('produto', (query) => query.pivotColumns(['quantidade', 'preco_unitario']))
      .preload('pagamento')
      .preload('enderecoEntrega')
      .firstOrFail()
  }

  async update({ params, request }: HttpContext) {
    const pedido = await Pedido.findOrFail(params.id)
    const payload = await request.validateUsing(updatePedidoValidator)
    return await pedido.merge(payload).save()
  }

  async destroy({ params }: HttpContext) {
    const pedido = await Pedido.findOrFail(params.id)
    await pedido.delete()
    return { message: 'Pedido deletado com sucesso.' }
  }
}
