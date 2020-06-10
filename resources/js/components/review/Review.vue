<template>
    <div>
        <success v-if="success"></success>
        <fatal-error v-if="error"></fatal-error>
        <div class="row" v-if="!success && !error">
            <div :class="[{'col-md-4': twoColumns}, {'d-none': oneColumn}]">
                <div class="card">
                    <div class="card-body">
                        <div v-if="loading">
                            Loading...
                        </div>
                        <div v-if="hasBooking">
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
                        <textarea 
                            name="content" 
                            class="form-control" 
                            cols="30" rows="10" 
                            v-model="review.content"
                            :class="[{'is-invalid': errorFor('content')}]"
                        ></textarea>
                         <v-errors :errors="errorFor('content')"></v-errors>
                    </div>
                    <button 
                        @click.prevent="submit" 
                        :disabled="sending" 
                        class="btn btn-lg btn-primary btn-block"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {is404, is422} from './../shared/utils/response';
import validationErrors from './../shared/mixins/validationErrors';

export default {
    mixins: [validationErrors,],
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
            errors: null,
            sending: false,
            success: false,
        }
    },
    methods: {
        submit() {
            this.errors = null;
            this.sending = true;
            this.success = false;

            axios.post(`/api/reviews`, this.review)
                .then(response => {
                    this.success = 201 == response.status;
                })
                .catch(error => {
                    if(is422(error)) {
                        const errors = error.response.data.errors;
                        if(errors['content'] && 1 == _.size(errors)) {
                            this.errors = errors;
                            return;
                        }
                    }
                    this.error = true
                })
                .then(() => (this.sending = false));
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
    async created () {
        this.review.id = this.$route.params.id;
        this.loading = true;

        try {
            this.existingReview = (await axios.get(`/api/reviews/${this.review.id}`)).data;
        } catch (error) {
            if (is404(error)) {
                try {
                    this.booking = (await axios.get(`/api/booking-by-review/${this.review.id}`)).data;
                } catch (error) {
                    this.error = !is404(error);
                }
            } else {
                this.error = true;
            }
        }
        this.loading = false;
    }
}
</script>
