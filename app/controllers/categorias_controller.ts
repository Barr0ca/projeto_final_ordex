import type { HttpContext } from '@adonisjs/core/http'
import Categoria from '#models/categoria'

export default class CategoriasController {
  async index({}: HttpContext) {
    const categorias = await Categoria.query().preload('produto')
    return categorias
  }

  async store({ request }: HttpContext) {
    const data = request.only(['nome'])
    const categoria = await Categoria.create(data)
    return categoria
  }

  async show({ params }: HttpContext) {
    const categoria = await Categoria.query()
      .where('id', params.id)
      .preload('produto')
      .firstOrFail()
    return categoria
  }

  async update({ params, request }: HttpContext) {
    const categoria = await Categoria.findOrFail(params.id)
    const data = request.only(['nome'])
    categoria.merge(data)
    await categoria.save()
    return categoria
  }

  async destroy({ params }: HttpContext) {
    const categoria = await Categoria.findOrFail(params.id)
    await categoria.delete()
    return { message: 'Categoria deletada com sucesso.' }
  }
}
