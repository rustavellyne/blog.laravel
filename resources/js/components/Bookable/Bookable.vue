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
                <availability :bookable-id="this.$route.params.id"></availability>
            </div>
        </div>
    </div>
</template>

<script>
import availability from './Availability'
import ReviewList from './ReviewList'
export default {
    components: {
        availability,
        ReviewList,
    },
    data () {
        return {
            loading: false,
            bookable: null,
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
    },
    created () {
        let id = this.$route.params.id;
        this.fetchBookable(id);
    }
}
</script>