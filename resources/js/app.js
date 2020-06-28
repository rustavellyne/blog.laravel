require('./bootstrap');
window.Vue = require('vue');
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import router from './routes';
import storeDefinition from './store';
import Index from './components/Index';
import moment from 'moment';
import StarRating from './components/shared/components/StarRating';
import FatalError from './components/shared/components/FatalError';
import Success from './components/shared/components/Success';
import ValidationErrors from './components/shared/components/ValidationErrors.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.filter('fromNow', value => moment(value).fromNow());

Vue.component('star-rating', StarRating);
Vue.component('fatal-error', FatalError);
Vue.component('success', Success);
Vue.component('v-errors', ValidationErrors);

const store = new Vuex.Store(storeDefinition);

window.axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status == 401) {
            store.dispatch('logout');
        }
        return Promise.reject(error);
    }
);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        index: Index,
    },
    async beforeCreate () {
        this.$store.dispatch('loadStoreState');
        this.$store.dispatch('loadUser');
    },
});
