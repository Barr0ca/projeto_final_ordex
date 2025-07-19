import Categoria from '#models/categoria'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriasController {
  async index({}: HttpContext) {
    return await Categoria.query().preload('produto')
  }

  async store({ request }: HttpContext) {
    return await Categoria.create(request.only(['nome']))
  }

  async show({ params }: HttpContext) {
    return await Categoria.findOrFail(params.id)
  }

  // async update({ params, request }: HttpContext) {}

  // async destroy({ params }: HttpContext) {}
}
