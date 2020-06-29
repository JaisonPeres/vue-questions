
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/questoes' },
      {
        path: '/provas',
        component: () => import('pages/Provas.vue'),
        meta: {
          title: 'Provas',
          description: 'Estude para concursos públicos com questões comentadas por professores e faça o download de exercícios, provas, simulados, editais.'
        }
      },
      {
        path: '/questoes',
        component: () => import('pages/Questions.vue'),
        meta: {
          title: 'Questões',
          description: 'Estude para concursos públicos com questões comentadas por professores e faça o download de exercícios, provas, simulados, editais.'
        }
      },
      {
        path: '/oab',
        component: () => import('pages/OAB.vue'),
        meta: {
          title: 'Questões OAB',
          description: 'Estude para concursos públicos com questões comentadas por professores e faça o download de exercícios, provas, simulados, editais.'
        }
      }
    ]
  }
]

// Always leave this as last one

// if (process.env.MODE !== 'ssr') {
// }
routes.push({
  path: '*',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    { path: '*', component: () => import('pages/Error404.vue') }
  ]
})

export default routes
