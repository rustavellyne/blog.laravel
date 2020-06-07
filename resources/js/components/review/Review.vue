<template>
    <div>
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
        }
    },
    methods: {

    },
    computed: {
        alreadyReviewed () {
            return this.existingReview != null;
        }
    },
    created () {
        this.loading = true;
        axios.get(`/api/reviews/${this.$route.params.id}`)
             .then(response => this.existingReview = response.data)
             .catch(error => {})
             .then(() => {
                 this.loading = false;
             })
    }
}
</script>