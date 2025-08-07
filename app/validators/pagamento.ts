import vine from '@vinejs/vine'

export const createPagamentoValidator = vine.compile(
  vine.object({
    metodos_pagamento: vine.enum(['CARTAO_CREDITO', 'PIX', 'BOLETO'] as const),
    status: vine.enum(['ESPERA', 'COMPLETO', 'FALHOU'] as const),
    valor_pagamento: vine.number().positive(),
    pedido_id: vine.number().positive()
  })
)

export const updatePagamentoValidator = vine.compile(
  vine.object({
    metodos_pagamento: vine.enum(['CARTAO_CREDITO', 'PIX', 'BOLETO'] as const).optional(),
    status: vine.enum(['ESPERA', 'COMPLETO', 'FALHOU'] as const).optional(),
    valor_pagamento: vine.number().positive().optional(),
  })
)