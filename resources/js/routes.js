import VueRouter from 'vue-router';
import Bookables from './components/Bookables';
import Bookable from './components/Bookable/Bookable';
import Basket from './components/Basket/Basket';
import Review from './components/review/Review';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

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
    {
        path: "/auth/login",
        component: Login,
        name: "login",
    },
    {
        path: "/auth/register",
        component: Register,
        name: "register",
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

export default router;