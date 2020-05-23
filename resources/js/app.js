require('./bootstrap');
window.Vue = require('vue');
import router from './routes';
import VueRouter from 'vue-router';
import Index from './components/Index';
import moment from 'moment';

Vue.use(VueRouter)
Vue.filter('fromNow', value => moment(value).fromNow());

const app = new Vue({
    el: '#app',
    router,
    components: {
        index: Index,
    },
});
