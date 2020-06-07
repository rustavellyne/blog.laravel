<template>
    <form @submit.prevent="check">
        <h5 class="text-uppercase text-secondary font-weight-bolder">
            Check availability
            <span v-if="noAvailability" class="text-danger">(NOT AVAILABLE)</span>
            <span v-if="hasAvailability" class="text-success">(AVAILABLE)</span>
        </h5>
        <div class="form-row">
           <div class="form-group col-md-6">
                <label for="from_date">From date</label>
                <input 
                    v-model="from" 
                    @keyup.enter="check" 
                    :class="[{'is-invalid': this.errorFor('from')}]"
                    type="text" 
                    class="form-control form-control-sm" 
                    name="from_date" 
                    placeholder="Start date"
                />
                <div 
                    v-for="(error, index) in this.errorFor('from')"
                    :key="'from' + index"
                    class="invalid-feedback"
                >{{error}}</div>
            </div>
            <div class="form-group col-md-6">
                <label for="to_date">To date</label>
                <input 
                    v-model="to" 
                    @keyup.enter="check" 
                    :class="[{'is-invalid': this.errorFor('to')}]"
                    type="text" 
                    class="form-control form-control-sm" 
                    name="to_date" 
                    placeholder="End date" 
                />
                <v-errors :errors="errorFor('to')"></v-errors>
            </div>
            <button type="submit" class="btn btn-block btn-secondary" :disabled="loading">Submit</button>
        </div>
    </form>
</template>

<script>
import { is422 } from './../shared/utils/response';
export default {
    props: {
        bookableId: String,
    },
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
            axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
                 .then(response => {
                    this.status = response.status;
                 })
                 .catch(error => {
                     if(is422(error)) {
                         this.errors = error.response.data.errors;
                     }
                     this.status = error.response.status;
                 }).then(()=>this.loading = false)
        },
        errorFor(field) {
            return this.hasErrors && this.errors[field] ? this.errors[field] : null;
        },
    },
    computed: {
        hasErrors () {
            return 422 == this.status && this.errors != null;
        },
        hasAvailability () {
            return 200 == this.status;
        },
        noAvailability () {
            return 404 == this.status;
        },
    },
}
</script>

<style scoped>
    label {
        font-size: 0.7rem;
        text-transform: uppercase;
        color: grey;
    }
    .is-invalid {
        border-color: #b22222;
        background-image: none;
    }
    .invalid-feedback {
        color: #b22222;
    }
</style>