import VueRouter from 'vue-router'
import Bookable from './components/Bookable'

const routes = [
    {
        path: '/',
        component: Bookable,
        name: 'home',
    },
    {
        path: '/contacts',
        name: 'contacts',
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

export default router