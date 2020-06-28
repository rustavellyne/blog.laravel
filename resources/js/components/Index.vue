<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom">
            <router-link :to="{ name: 'home'}" class="navbar-brand mr-auto">Home</router-link>

            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link :to="{ name: 'basket'}" class="nav-link">
                        Basket
                        <span v-if="itemsInBasket" class="badge badge-secondary"> 
                            {{ itemsInBasket }} 
                        </span>
                    </router-link>
                </li>

                <li v-if="!isLoggedIn" class="nav-item">
                    <router-link :to="{name: 'register'}" class="nav-link">Register</router-link>
                </li>
                <li v-if="!isLoggedIn" class="nav-item">
                    <router-link :to="{name: 'login'}" class="nav-link">Sign-in</router-link>
                </li>
                <li v-if="isLoggedIn" class="nav-item">
                    <a class='nav-link' href="#" @click.prevent="logout">Logout</a>
                </li>
            </ul>

        </nav>
        <div class="container mt-4 mb-4 pl-4 pr-4">
            <router-view></router-view>
        </div>
        
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

export default {
    data () {
        return {
            lastSearch: this.$store.state.lastSearch,
        }
    },
    methods: {
        async logout () {
            try {
                axios.post('logout');
                this.$store.dispatch('logout');
            } catch (error) {
                console.log(error);
            }
        }
    },
    computed: {
        ...mapState({
            lastSearchComputed: 'lastSearch',
            isLoggedIn: 'isLoggedIn',
        }),
        ...mapGetters({
            itemsInBasket: 'itemsInBasket'
        })
    },
}
</script>