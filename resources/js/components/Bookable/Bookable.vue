<template>
    <div>
        <div class="row">
            <div class="col-md-8">
                <h3 v-if="loading">Loading...</h3>
                <div v-else class="card mb-3">
                    <div class="card-header">{{ bookable.title }}</div>
                    <div class="card-body">
                        <p class="card-text">{{ bookable.description }}</p>
                    </div>
                </div>
                <review-list :bookable-id="this.$route.params.id"></review-list>
            </div>
            <div class="col-md-4">
                <availability 
                    :bookable-id="this.$route.params.id" 
                    @availability="checkPrice($event)"
                    class="mb-4"
                ></availability>

                <transition name="fade">
                    <price-breakdown 
                        v-if="price" 
                        :price="price"
                        class="mb-4"
                    ></price-breakdown>
                </transition>

                <transition name="fade">
                    <button 
                        v-if="price" 
                        @click="addToBasket" 
                        :disabled="inBasketAlready"
                        class="btn btn-outline-secondary btn-block">
                        Book now
                    </button>
                </transition>
                <transition name="fade">
                    <button 
                        v-if="inBasketAlready" 
                        @click="removeFromBasket" 
                        class="btn btn-outline-secondary btn-block">
                        Remove from basket
                    </button>
                </transition>
                    
                <div v-if="inBasketAlready" class="mt-4 text-muted warning">
                    Seems like this object in basket already!
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import availability from './Availability';
import ReviewList from './ReviewList';
import PriceBreakdown from './PriceBreakdown';

export default {
    components: {
        availability,
        ReviewList,
        PriceBreakdown,
    },
    data () {
        return {
            loading: false,
            bookable: null,
            price: null,
        }
    },
    methods: {
        fetchBookable (id) {
            this.loading = true;
            return axios.get(`/api/bookables/${id}`)
                        .then(response => this.setBookable(response.data))
                        .then(result => this.loading = false)
        },
        setBookable (data) {
            this.bookable = data;
        },
        async checkPrice (hasAvailability) {
            if (!hasAvailability) {
                this.price = null;
                return false;
            }
            try {
                let id = this.$route.params.id;
                this.price = await (await axios.get(
                    `/api/bookables/${id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`
                )).data;
            } catch (error) {
                 console.log(error)
                this.price = null;
            }
        },
        addToBasket () {
            this.$store.dispatch('addToBasket', {
                bookable: this.bookable,
                price: this.price,
                dates: this.lastSearch,
            })
        },
        removeFromBasket () {
            this.$store.dispatch('removeFromBasket', this.bookable.id);
        }
    },
    computed: {
        ...mapState({
            lastSearch: 'lastSearch',
            inBasketAlready() {
                if (this.bookable == null) {
                    return false;
                }
                return this.$store.getters.inBasketAlready(this.bookable.id);
            },
        })
    },
    created () {
        let id = this.$route.params.id;
        this.fetchBookable(id);
    }
}
</script>

<style scoped>
    .warning {
        font-size: 0.7rem;
    }
</style>