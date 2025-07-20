import Pedido from '#models/pedido'
import type { HttpContext } from '@adonisjs/core/http'

export default class ItensPedidosController {
  async itensPedidos({ params, request }: HttpContext) {
    const pedido = await Pedido.findOrFail(params.id)

    await pedido.related('produto').attach(request.input('produto'))

    await pedido.load('produto')
    return pedido
  }
}
