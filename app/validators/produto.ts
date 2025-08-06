import vine from '@vinejs/vine'

export const createProdutoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(4),
    preco: vine.number().positive(),
    descricao: vine.string().trim().escape(),
    quantidade_estoque: vine.number().positive()
  })
)

export const updateProdutoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(4).optional(),
    preco: vine.number().positive().optional(),
    descricao: vine.string().trim().escape().optional(),
    quantidade_estoque: vine.number().positive().optional()
  })
)