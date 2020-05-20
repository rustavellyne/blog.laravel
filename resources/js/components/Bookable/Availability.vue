<template>
    <form @submit.prevent="check">
        <h5 class="text-uppercase text-secondary font-weight-bolder">Check availability</h5>
        <div class="form-row">
           <div class="form-group col-md-6">
                <label for="from_date">From date</label>
                <input v-model="from_date" type="text" class="form-control form-control-sm" name="from_date" placeholder="Start date">
            </div>
            <div class="form-group col-md-6">
                <label for="to_date">To date</label>
                <input v-model="to_date" type="text" class="form-control form-control-sm" name="to_date" placeholder="End date">
            </div>
            <button type="submit" class="btn btn-block btn-secondary">Submit</button>
        </div>
    </form>
</template>

<script>
export default {
    data () {
        return {
            from_date: '',
            to_date: '',
        }
    },
    methods: {
        check () {
            console.log('form date checking')
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