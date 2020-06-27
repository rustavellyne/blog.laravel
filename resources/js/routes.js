import VueRouter from 'vue-router';
import Bookables from './components/Bookables';
import Bookable from './components/Bookable/Bookable'
import Basket from './components/Basket/Basket'
import Review from './components/review/Review'

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
    {
        path: "/review/:id",
        component: Review,
        name: "review",
    },
    {
        path: "/basket",
        component: Basket,
        name: "basket",
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

export default router;