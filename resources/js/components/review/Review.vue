<template>
    <div>
        <div class="row" v-if="error">
            Unknown error please try again later
        </div>
        <div class="row" v-else>
            <div :class="[{'col-md-4': twoColumns}, {'d-none': oneColumn}]">
                <div class="card">
                    <div class="card-body">
                        <div v-if="loading">
                            Loading...
                        </div>
                        <div v-else>
                            <p>
                                Stayed at 
                                <router-link :to="{name: 'bookable', params: {id: booking.bookable.bookable_id}}">
                                    {{ booking.bookable.title }}
                                </router-link>
                            </p>
                            <p>
                                From {{ booking.from }} to {{ booking.to }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="[{'col-md-8': twoColumns}, {'col-md-8': oneColumn}]">
                <div v-if="loading">
                    Loading...
                </div>
                <div v-else-if="alreadyReviewed">
                    <h3>Your already left Review for this booking!</h3>
                </div>
                <div v-else>
                    <div class="form-group">
                        <label class="text-muted">
                            Seelct the star rating (1 is worst - 5 is best)
                        </label>
                        <star-rating 
                            class="fa-3x"
                            v-model="review.rating"
                        ></star-rating>
                    </div>
                    <div class="form-group">
                        <label for="content" class="text-muted">
                            Describe your expirience with
                        </label>
                        <textarea name="content" class="form-control" cols="30" rows="10" v-model="review.content"></textarea>
                    </div>
                    <button @click.prevent="submit" :disabled="loading" class="btn btn-lg btn-primary btn-block">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {is404} from './../shared/utils/response'
export default {
    data () {
        return {
            review: {
                id: null,
                rating: 5,
                content: null,
            },
            existingReview: null,
            loading: false,
            booking: null,
            error: false,
        }
    },
    methods: {
        submit() {
            this.loading = true;
            axios.post(`/api/reviews`, this.review)
                .then(response => console.log(response))
                .catch(error => this.error = true)
                .then(() => (this.loading = false));
        },
    },
    computed: {
        hasReview () {
            return this.existingReview != null;
        },
        alreadyReviewed () {
            return this.hasReview || !this.booking
        },
        hasBooking() {
            return this.booking != null
        },
        oneColumn() {
            return !this.loading && this.alreadyReviewed; 
        },
        twoColumns() {
            return this.loading || !this.alreadyReviewed;
        },
    },
    created () {
        this.review.id = this.$route.params.id;
        this.loading = true;
        axios.get(`/api/reviews/${this.review.id}`)
             .then(response => {
                 this.existingReview = response.data
             })
             .catch(error => {
                 if (is404(error)) {
                     return axios.get(`/api/booking-by-review/${this.review.id}`)
                                .then(response => {
                                    this.booking = response.data
                                }).catch((error) => {
                                    this.error = !is404(error);
                                })
                 }
                 this.error = false;
             })
             .then(response => {
                 console.log(response)
                 this.loading = false;
             })
    }
}
</script>