import Pedido from '#models/pedido'
import type { HttpContext } from '@adonisjs/core/http'

export default class PedidosController {
  async index({}: HttpContext) {
    return await Pedido.query().preload('produto').preload('pagamento').preload('enderecoEntrega')
  }

  async store({ request }: HttpContext) {
    return await Pedido.create(request.only(['status', 'total']))
  }

  async show({ params }: HttpContext) {
    return await Pedido.findOrFail(params.id)
  }

  // async update({ params, request }: HttpContext) {}

  // async destroy({ params }: HttpContext) {}
}
