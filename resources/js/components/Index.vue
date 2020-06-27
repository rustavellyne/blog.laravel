<template>
    <div>
        <nav class="navbar navbar-light bg-white border-bottom">
            <router-link :to="{ name: 'home'}" class="navbar-brand mr-auto">Home</router-link>
            <router-link :to="{ name: 'basket'}" class="btn nav-button">
                Basket
                <span v-if="itemsInBasket" class="badge badge-secondary"> 
                    {{ itemsInBasket }} 
                </span>
            </router-link>
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
    computed: {
        ...mapState({
            lastSearchComputed: 'lastSearch'
        }),
        ...mapGetters({
            itemsInBasket: 'itemsInBasket'
        })
    },
}
</script>