import type { HttpContext } from '@adonisjs/core/http'
import Pagamento from '#models/pagamento'
import { createPagamentoValidator, updatePagamentoValidator } from '#validators/pagamento'

export default class PagamentosController {
  public async index({}: HttpContext) {
    return await Pagamento.all()
  }

  public async show({ params }: HttpContext) {
    return await Pagamento.findOrFail(params.id)
  }

  public async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPagamentoValidator)
    return await Pagamento.create(payload)
  }

  public async update({ request, params }: HttpContext) {
    const pagamento = await Pagamento.findOrFail(params.id)
    const payload = await request.validateUsing(updatePagamentoValidator)
    return await pagamento.merge(payload).save()
  }

  public async destroy({ params }: HttpContext) {
    const pagamento = await Pagamento.findOrFail(params.id)
    await pagamento.delete()
    return { message: 'Pagamento deletado com sucesso.' }
  }
}
