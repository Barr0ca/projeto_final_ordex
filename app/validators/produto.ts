import vine from '@vinejs/vine'

export const createProdutoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(4),
    preco: vine.number().positive().withoutDecimals(),
    descricao: vine.string().trim().escape(),
    quantidadeEstoque: vine.number().positive(),
  })
)

export const updateProdutoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(4),
    preco: vine.number().positive().withoutDecimals(),
    descricao: vine.string().trim().escape(),
    quantidadeEstoque: vine.number().positive(),
  })
)
