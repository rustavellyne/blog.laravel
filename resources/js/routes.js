import VueRouter from 'vue-router'
import homeComponent from './components/ExampleComponent.vue'
import ContactComponent from './components/ExampleComponent2.vue'
const routes = [
    {
        path: '/',
        component: homeComponent,
        name: 'home',
    },
    {
        path: '/contacts',
        component: ContactComponent,
        name: 'contacts',
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

export default router