import vine from '@vinejs/vine'

enum MetodoPagamento {
  CARTAO_CREDITO = 'CARTAO_CREDITO',
  PIX = 'PIX',
  BOLETO = 'BOLETO',
}

enum Status {
  ESPERA = 'ESPERA',
  COMPLETO = 'COMPLETO',
  FALHOU = 'FALHOU',
}

export const createPagamentoValidator = vine.compile(
  vine.object({
    metodosPagamento: vine.enum(MetodoPagamento),
    status: vine.enum(Status).optional(),
    valorPagamento: vine.number().positive().withoutDecimals(),
    pedidoId: vine.number().positive().min(1),
  })
)

export const updatePagamentoValidator = vine.compile(
  vine.object({
    metodosPagamento: vine.enum(MetodoPagamento),
    status: vine.enum(Status).optional(),
    valorPagamento: vine.number().positive().withoutDecimals(),
    pedidoId: vine.number().positive().min(1),
  })
)
