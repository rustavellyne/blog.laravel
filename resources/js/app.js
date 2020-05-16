require('./bootstrap');
window.Vue = require('vue');
import router from './routes';
import VueRouter from 'vue-router';
import Index from './components/Index';

Vue.use(VueRouter)

const app = new Vue({
    el: '#app',
    router,
    components: {
        index: Index,
    },
});
