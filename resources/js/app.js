require('./bootstrap');
window.Vue = require('vue');
import router from './routes';
import VueRouter from 'vue-router';
import Index from './components/Index';
import moment from 'moment';
import StarRating from './components/shared/components/StarRating';
import FatalError from './components/shared/components/FatalError';
import ValidationErrors from './components/shared/components/ValidationErrors.vue';

Vue.use(VueRouter)
Vue.filter('fromNow', value => moment(value).fromNow());
Vue.component('star-rating', StarRating)
Vue.component('fatal-error', FatalError)
Vue.component('v-errors', ValidationErrors)

const app = new Vue({
    el: '#app',
    router,
    components: {
        index: Index,
    },
});
