<template>
    <div>
        <div class="row">
            <div v-if="itemsInBasket" class="col-md-8">
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="first_name">First name</label>
                        <input v-model="customer.first_name" name="first_name" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="last_name">Last name</label>
                        <input v-model="customer.last_name" name="last_name" type="text" class="form-control" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 form-group">
                        <label for="email">Email</label>
                        <input v-model="customer.email" name="email" type="email" class="form-control" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="city">City</label>
                        <input v-model="customer.city" name="city" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="street">Street</label>
                        <input v-model="customer.street" name="street" type="text" class="form-control" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="country">Country</label>
                        <input v-model="customer.country" name="country" type="text" class="form-control" />
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="state">State</label>
                        <input v-model="customer.state" name="state" type="text" class="form-control" />
                    </div>
                    <div class="col-md-2 form-group">
                        <label for="zip">Zip</label>
                        <input v-model="customer.zip" name="zip" type="text" class="form-control" />
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-md-12 form-group">
                        <button 
                            type="submit" 
                            class="btn btn-large btn-primary btn-block"
                            @click.prevent="book">
                            Book now!
                        </button>
                    </div>
                </div>
            </div>
            <div v-else class="col-md-8">
                <div class="jumbotron jumbotron-fluid text-center">
                    <h2>Empty</h2>
                </div>
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6 class="text-uppercase text-secondary font-weight-bolder">Your Cart</h6>
                    <h6 class="badge badge-secondary text-uppercase">
                        <span v-if="itemsInBasket">
                            Items {{ itemsInBasket }}
                        </span>
                        <span v-else>
                            Empty
                        </span>
                    </h6>
                </div>
                <transition-group name="fade" tag="div">
                    <div v-for="item in basket" :key="item.bookable.id">
                        <div class="pt-2 pb-2 border-top d-flex justify-content-between">
                            <span>
                                <router-link :to="{name: 'bookable', params: {id: item.bookable.id}}">
                                    {{ item.bookable.title }}
                                </router-link>
                            </span>
                            <span class="font-weight-bold">
                                {{ item.price.total }}
                            </span>
                        </div>
                        <div class="pt-2 pb-2 d-flex justify-content-between">
                            <span>
                                From {{ item.dates.from }}
                            </span>
                            <span>
                                To {{ item.dates.to }}
                            </span>
                        </div>
                        <div class="pt-2 pb-2 text-right">
                            <button 
                                @click="$store.dispatch('removeFromBasket', item.bookable.id)" 
                                class="btn btn-sm btn-outline-secondary">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import validationErrors from './../shared/mixins/validationErrors';

export default {
    mixins: [validationErrors],
    data () {
        return {
            loading: false,
            customer: {
                first_name: null,
                last_name: null,
                email: null,
                street: null,
                city: null,
                country: null,
                state: null,
                zip: null,
            },
        }
    },
    methods: {
        async book() {
            this.loading = true;
            try {
                await axios.post(`/api/checkout`, {
                    customer: this.customer,
                    bookings: this.basket.map(basketItem => ({
                        bookable_id: basketItem.bookable.id,
                        from: basketItem.dates.from,
                        to: basketItem.dates.to,
                    })),
                })
                this.$store.dispatch('clearBasket');
            } catch (error) {
                console.log(error)
                this.loading = false;
            }
        },
    },
    computed: {
        ...mapGetters(['itemsInBasket']),
        ...mapState({
            basket: state => state.basket.items
        })
    },
}
</script>

<style scoped>
    h6.badge {
        font-size: 100%;
    }
    a {
        color: black;
    }
</style>