import EnderecoEntrega from '#models/endereco_entrega'
import type { HttpContext } from '@adonisjs/core/http'

export default class EnderecoEntregasesController {
  async index({}: HttpContext) {
    return await EnderecoEntrega.all()
  }

  async store({ request }: HttpContext) {
    return await EnderecoEntrega.create(
      request.only(['endereco', 'cidade', 'estado', 'caixaPostal', 'pais', 'pedidoId', 'usuarioId'])
    )
  }

  async show({ params }: HttpContext) {
    return await EnderecoEntrega.findOrFail(params.id)
  }

  // async update({ params, request }: HttpContext) {}

  // async destroy({ params }: HttpContext) {}
}
