import router from '@adonisjs/core/services/router'

const CategoriasController = () => import('#controllers/categorias_controller')
const EnderecosEntregaController = () => import('#controllers/enderecos_entrega_controller')
const PagamentosController = () => import('#controllers/pagamentos_controller')
const PedidosController = () => import('#controllers/pedidos_controller')
const ProdutosController = () => import('#controllers/produtos_controller')
const UsuariosController = () => import('#controllers/usuarios_controller')

const CategoriaProdutosController = () => import('#controllers/categoria_produtos_controller')
const ItensPedidosController = () => import('#controllers/itens_pedidos_controller')

router.resource('/categoria', CategoriasController).except(['create', 'edit'])
router.resource('/endereco-entrega', EnderecosEntregaController).except(['create', 'edit'])
router.resource('/pagamento', PagamentosController).except(['create', 'edit'])
router.resource('/pedido', PedidosController).except(['create', 'edit'])
router.resource('/produto', ProdutosController).except(['create', 'edit'])
router.resource('/usuario', UsuariosController).except(['create', 'edit'])

router.post('/categoria/:id/associar-produto', [
  CategoriaProdutosController,
  'associarCategoriaProdutos',
])
router.post('/categoria/:id/desassociar-produto', [
  CategoriaProdutosController,
  'desassociarCategoriaProdutos',
])

router.post('/pedido/:id/adicionar-pedido', [ItensPedidosController, 'associarItensPedidos'])
router.post('/pedido/:id/retirar-pedido', [ItensPedidosController, 'desassociarItensPedidos'])
