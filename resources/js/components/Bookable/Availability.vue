<template>
    <form @submit.prevent="check">
        <h5 class="text-uppercase text-secondary font-weight-bolder">
            Check availability
            <transition name="fade">
                <span v-if="noAvailability" class="text-danger">(NOT AVAILABLE)</span>
                <span v-if="hasAvailability" class="text-success">(AVAILABLE)</span>
            </transition>
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
            <button type="submit" class="btn btn-block btn-secondary" :disabled="loading">
                <span v-if="!loading">Submit</span>
                <span v-if="loading">
                    <i class="fas fa-spinner fa-pulse"></i>
                    Checking...
                </span>
            </button>
        </div>
    </form>
</template>

<script>
import { is422 } from './../shared/utils/response';
import validationErrors from './../shared/mixins/validationErrors';

export default {
    mixins: [validationErrors,],
    props: {
        bookableId: [String, Number],
    },
    data () {
        return {
            from: this.$store.state.lastSearch.from || null,
            to: this.$store.state.lastSearch.to || null,
            status: '',
            errors: '',
            loading: false,
        }
    },
    methods: {
        
        check () {
            this.loading = true;
            this.errors = null;

            this.$store.dispatch('setLastSearch', {
                from: this.from,
                to: this.to,
            });


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