import vine from '@vinejs/vine'

enum Status {
  ESPERA = 'ESPERA',
  ROTA_ENTREGA = 'ROTA_ENTREGA',
  CANCELADO = 'CANCELADO',
  ENTREGUE = 'ENTREGUE',
}

export const createPedidoValidator = vine.compile(
  vine.object({
    status: vine.enum(Status).optional(),
    total: vine.number().positive().withoutDecimals(),
    usuarioId: vine.number().positive().min(1),
  })
)

export const updatePedidoValidator = vine.compile(
  vine.object({
    status: vine.enum(Status).optional(),
    total: vine.number().positive().withoutDecimals(),
    usuarioId: vine.number().positive().min(1),
  })
)
