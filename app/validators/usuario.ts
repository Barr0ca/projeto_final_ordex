import vine from '@vinejs/vine'

export const createUsuarioValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3),
    email: vine.string().email().trim(),
    senha: vine.string().trim().minLength(6),
  })
)

export const updateUsuarioValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3),
    email: vine.string().email().trim(),
    senha: vine.string().trim().minLength(6),
  })
)
