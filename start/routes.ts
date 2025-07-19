/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const ProdutosController = () => import('#controllers/produtos_controller')
const CategoriasController = () => import('#controllers/categorias_controller')
const PedidosController = () => import('#controllers/pedidos_controller')
const PagamentosController = () => import('#controllers/pagamentos_controller')
const EnderecosEntregaController = () => import('#controllers/endereco_entregas_controller')
const AssociarProduto = () => import('#controllers/categoria_produtos_controller')

router.resource('/produto', ProdutosController).except(['create', 'edit'])
router.resource('/categoria', CategoriasController).except(['create', 'edit'])
router.resource('/pedido', PedidosController).except(['create', 'edit'])
router.resource('/pagamento', PagamentosController).except(['create', 'edit'])
router.resource('/endereco-entrega', EnderecosEntregaController).except(['create', 'edit'])

router.post('/categoria/:id/associar-produto', [AssociarProduto, 'associarProduto'])
