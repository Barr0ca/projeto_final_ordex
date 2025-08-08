import vine from '@vinejs/vine'

export const createCategoriaValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3).maxLength(50),
  })
)

export const updateCategoriaValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3).maxLength(50),
  })
)
