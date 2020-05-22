<template>
    <form @submit.prevent="check">
        <h5 class="text-uppercase text-secondary font-weight-bolder">Check availability</h5>
        <div class="form-row">
           <div class="form-group col-md-6">
                <label for="from_date">From date</label>
                <input v-model="from" type="text" class="form-control form-control-sm" name="from_date" placeholder="Start date">
            </div>
            <div class="form-group col-md-6">
                <label for="to_date">To date</label>
                <input v-model="to" type="text" class="form-control form-control-sm" name="to_date" placeholder="End date">
            </div>
            <button type="submit" class="btn btn-block btn-secondary" :disabled="loading">Submit</button>
        </div>
    </form>
</template>

<script>
export default {
    data () {
        return {
            from: '',
            to: '',
            status: '',
            errors: '',
            loading: false,
        }
    },
    methods: {
        check () {
            this.loading = false;
            let id = this.$route.params.id;
            axios.get(`/api/bookables/${id}/availability?from=${this.from}&to=${this.to}`)
                 .then(response => {
                    this.status = response.status;
                 })
                 .catch(error => {
                     if(422 == error.response.status) {
                         this.errors = error.response.data.errors;
                     }
                     this.status = error.response.status;
                 }).then(()=>this.loading = false)
        }
    },
}
</script>

<style scoped>
    label {
        font-size: 0.7rem;
        text-transform: uppercase;
        color: grey;
    }
</style>