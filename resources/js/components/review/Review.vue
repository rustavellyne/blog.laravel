<template>
    <div class="row">
        <div :class="[{'col-md-4': loading || !alreadyReviewed}, {'d-none': !loading && alreadyReviewed}]">
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
        <div :class="[{'col-md-8': loading || !alreadyReviewed}, {'col-md-8': !loading && alreadyReviewed}]">
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
                <button class="btn btn-lg btn-primary btn-block">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            review: {
                rating: 5,
                content: null,
            },
            existingReview: null,
            loading: false,
            booking: null,
        }
    },
    methods: {

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
    },
    created () {
        this.loading = true;
        axios.get(`/api/reviews/${this.$route.params.id}`)
             .then(response => {
                 this.existingReview = response.data
             })
             .catch(error => {
                 console.log(error)
                 if (error.response && error.response.status && 404 == error.response.status) {
                     return axios.get(`/api/booking-by-review/${this.$route.params.id}`)
                                .then(response => {
                                    this.booking = response.data
                                })
                 }
             })
             .then(response => {
                 console.log(response)
                 this.loading = false;
             })
    }
}
</script>