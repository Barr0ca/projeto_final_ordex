import vine from '@vinejs/vine'

export const createEnderecoEntregaValidator = vine.compile(
  vine.object({
    endereco: vine.string().trim().maxLength(255),
    cidade: vine.string().trim().maxLength(100),
    estado: vine.string().trim().maxLength(100),
    caixaPostal: vine.string().trim().maxLength(20),
    pais: vine.string().trim().maxLength(100),
    pedidoId: vine.number().positive().min(1),
    usuarioId: vine.number().positive().min(1),
  })
)

export const updateEnderecoEntregaValidator = vine.compile(
  vine.object({
    endereco: vine.string().trim().maxLength(255),
    cidade: vine.string().trim().maxLength(100),
    estado: vine.string().trim().maxLength(100),
    caixaPostal: vine.string().trim().maxLength(20),
    pais: vine.string().trim().maxLength(100),
    pedidoId: vine.number().positive().min(1),
    usuarioId: vine.number().positive().min(1),
  })
)
