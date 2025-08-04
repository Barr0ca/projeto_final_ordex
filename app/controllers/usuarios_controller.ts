import Usuario from '#models/usuario'
import { createUsuarioValidator, updateUsuarioValidator } from '#validators/usuario'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsuariosController {
  async index({}: HttpContext) {
    return await Usuario.query().preload('pedido').preload('enderecoEntrega')
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createUsuarioValidator)
    return await Usuario.create(payload)
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
    const payload = await request.validateUsing(updateUsuarioValidator)
    return await usuario.merge(payload).save()
  }

  async destroy({ params }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)
    await usuario.delete()
    return { message: 'Usuário deletado com sucesso.' }
  }
}
