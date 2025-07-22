import type { HttpContext } from '@adonisjs/core/http'
import EnderecoEntrega from '#models/endereco_entrega'
export default class EnderecoEntregasesController {
  
  async index({}: HttpContext) {
    return EnderecoEntrega.query().preload('usuario').preload('pedido')
  }

  async store({ request }: HttpContext) {
    const data = request.only([
      'endereco',
      'cidade',
      'estado',
      'caixaPostal',
      'pais',
      'pedidoId',
      'usuarioId'
    ])
    return EnderecoEntrega.create(data)
  }

  async show({ params }: HttpContext) {
    return EnderecoEntrega.query()
    .where('id', params.id)
    .preload('usuario')
    .preload('pedido')
    .firstOrFail()
  }

  async update({ params, request }: HttpContext) {
    const endereco = await EnderecoEntrega.findOrFail(params.id)
    endereco.merge(request.only([
      'endereco',
      'cidade',
      'estado',
      'caixaPostal',
      'pais'
      ])
    )
    await endereco.save()
    return endereco
  }
 
  async destroy({ params }: HttpContext) {
    const endereco = await EnderecoEntrega.findOrFail(params.id)
    endereco.delete()
    return { message: 'Endereço de entrega deletado com sucesso' }
  }
}