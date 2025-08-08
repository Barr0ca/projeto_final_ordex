import type { HttpContext } from '@adonisjs/core/http'
import Categoria from '#models/categoria'
import { createCategoriaValidator, updateCategoriaValidator } from '#validators/categoria'

export default class CategoriasController {
  async index({}: HttpContext) {
    const categorias = await Categoria.query().preload('produto')
    return categorias
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createCategoriaValidator)
    return await Categoria.create(payload)
  }

  async show({ params }: HttpContext) {
    const categoria = await Categoria.query()
      .where('id', params.id)
      .preload('produto')
      .firstOrFail()
    return categoria
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updateCategoriaValidator)
    const categoria = await Categoria.findOrFail(params.id)
    return await categoria.merge(payload).save()
  }

  async destroy({ params }: HttpContext) {
    const categoria = await Categoria.findOrFail(params.id)
    await categoria.delete()
    return { message: 'Categoria deletada com sucesso.' }
  }
}
