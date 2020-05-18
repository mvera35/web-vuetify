import Vue from 'vue'
import VueRouter from 'vue-router'
import TablaAlumnos from '../views/estudiantes.vue'
import TablaCursos from '../views/cursos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/estudiantes'
  },
  {
    path: '/estudiantes',
    component: TablaAlumnos,
    name: 'estudiantes'
  },
  {
    path: '/cursos',
    name: 'cursos',
    component: TablaCursos
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
