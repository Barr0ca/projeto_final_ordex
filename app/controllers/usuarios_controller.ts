import Usuario from '#models/usuario'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsuariosController {
  async index({}: HttpContext) {
    return await Usuario.query().preload('pedido').preload('enderecoEntrega')
  }

  async store({ request }: HttpContext) {
    return await Usuario.create(request.only(['nome', 'email', 'senha']))
  }

  async show({ params }: HttpContext) {
    return await Usuario.query()
      .where('id', params.id)
      .preload('pedido')
      .preload('enderecoEntrega')
      .firstOrFail()
  }

  async update({ params, request }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)
    return await usuario.merge(request.only(['nome', 'email', 'senha'])).save()
  }

  async destroy({ params }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)
    await usuario.delete()
    return { message: 'Usuário deletado com sucesso.' }
  }
}
