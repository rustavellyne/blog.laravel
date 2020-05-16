require('./bootstrap');
window.Vue = require('vue');
import router from './routes';
import VueRouter from 'vue-router';

Vue.use(VueRouter)
Vue.component('example-component1', require('./components/ExampleComponent.vue').default);
Vue.component('example-component2', require('./components/ExampleComponent2.vue').default);

const app = new Vue({
    el: '#app',
    router,
});
