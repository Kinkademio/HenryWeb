import NotFound from '../pages/ErrorNotFound.vue'
import Main from '../pages/Main.vue'
import Create from '../pages/Create.vue'
import Edit from '../pages/Edit.vue'
import Test from '../pages/Test.vue'

const routes = [{
    path: '/',
    component: Main,
    name: 'main',
    redirect: '/create',
    children:[
      {
        path: '/create',
        component: Create,
        name: 'create',
      },
      {
        path: '/edit',
        component: Edit,
        name: 'edit',
      },
      {
        path: '/test',
        component: Test,
        name: 'test',
      }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: NotFound
  }
]

export default routes
