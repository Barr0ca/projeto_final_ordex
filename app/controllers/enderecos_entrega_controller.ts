import type { HttpContext } from '@adonisjs/core/http'
import EnderecoEntrega from '#models/endereco_entrega'
import { createEnderecoEntregaValidator, updateEnderecoEntregaValidator } from '#validators/enderecos_entrega'
export default class EnderecoEntregasesController {
  async index({}: HttpContext) {
    return await EnderecoEntrega.all()
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createEnderecoEntregaValidator)
    return await EnderecoEntrega.create(payload)
  }

  async show({ params }: HttpContext) {
    return await EnderecoEntrega.findOrFail(params.id)
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updateEnderecoEntregaValidator)
    const endereco = await EnderecoEntrega.findOrFail(params.id)
    endereco.merge(payload)
    return await endereco.save()
    
  }

  async destroy({ params }: HttpContext) {
    const endereco = await EnderecoEntrega.findOrFail(params.id)
    await endereco.delete()
    return { message: 'Endereço de entrega deletado com sucesso.' }
  }
}