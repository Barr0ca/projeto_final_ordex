import { test } from '@japa/runner'

test.group('[POST] Cadastrar usuário', () => {
  test('Cria um usuário com todos os campos obrigatórios', async ({ client }) => {
    const response = await client.post('/usuario').json({
      nome: 'João',
      email: 'joao@email.com',
      senha: '123456',
    })

    response.assertStatus(200)
  })

  test('Tenta criar usuário sem dados no corpo da requisição', async ({ client }) => {
    const response = await client.post('/usuario').json({})

    response.assertStatus(422)
  })
})

test.group('[GET] Listar usuário', () => {
  test('Lista todos os usuários cadastrados', async ({ client }) => {
    const response = await client.get('/usuario')

    response.assertStatus(200)
  })

  test('Verifica um usuário específico através do ID', async ({ client }) => {
    const response = await client.get('/usuario/1')

    response.assertStatus(200)
  })

  test('Tenta consultar um usuário que não existe, através do ID', async ({ client }) => {
    const response = await client.get('/usuario/9999')

    response.assertStatus(404)
  })
})

test.group('[PUT] Atualizar usuário', () => {
  test('Atualiza um usuário passando todos os campos obrigatórios', async ({ client }) => {
    const response = await client.put('/usuario/1').json({
      nome: 'Teste',
      email: 'teste@email.com',
      senha: 'teste123',
    })

    response.assertStatus(200)
  })

  test('Rejeita atualização de usuário quando nenhum campo é enviado', async ({ client }) => {
    const response = await client.put('/usuario/1').json({})

    response.assertStatus(422)
  })

  test('Tenta atualizar um usuário que não existe', async ({ client }) => {
    const response = await client.put('/usuario/9999').json({
      nome: 'Teste2',
      email: 'teste2@email.com',
      senha: 'teste123',
    })

    response.assertStatus(404)
  })
})

test.group('[DELETE] Deletar usuário', () => {
  test('Deleta um usuário através do ID', async ({ client }) => {
    const response = await client.delete('/usuario/1')

    response.assertStatus(200)
  })

  test('Tenta deletar um usuário que não existe', async ({ client }) => {
    const response = await client.delete('/usuario/9999')

    response.assertStatus(404)
  })
})
