import VueRouter from 'vue-router';
import Bookables from './components/Bookables';
import Bookable from './components/Bookable/Bookable'

const routes = [
    {
        path: '/',
        component: Bookables,
        name: 'home',
    },
    {
        path: '/bookable/:id',
        component: Bookable,
        name: 'bookable',
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

export default router;