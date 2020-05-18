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
            </div>
            <div class="col-md-4">
                <h4>prices & accessebility</h4>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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