import type { HttpContext } from '@adonisjs/core/http'
import EnderecoEntrega from '#models/endereco_entrega'
export default class EnderecoEntregasesController {
  async index({}: HttpContext) {
    return await EnderecoEntrega.all()
  }

  async store({ request }: HttpContext) {
    const data = request.only([
      'endereco',
      'cidade',
      'estado',
      'caixaPostal',
      'pais',
      'pedidoId',
      'usuarioId',
    ])
    return await EnderecoEntrega.create(data)
  }

  async show({ params }: HttpContext) {
    return await EnderecoEntrega.findOrFail(params.id)
  }

  async update({ params, request }: HttpContext) {
    const endereco = await EnderecoEntrega.findOrFail(params.id)
    return await endereco
      .merge(request.only(['endereco', 'cidade', 'estado', 'caixaPostal', 'pais']))
      .save()
  }

  async destroy({ params }: HttpContext) {
    const endereco = await EnderecoEntrega.findOrFail(params.id)
    await endereco.delete()
    return { message: 'Endereço de entrega deletado com sucesso.' }
  }
}
