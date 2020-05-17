<template>
    <div>
        <div v-if="loading">
            <h3>Loading...</h3>
        </div>
        <div v-else>
            <div 
                class="row" 
                v-for="row in rows"
                :key="row + 'row'"
            >
                <div 
                    v-for="bookable in getBookablesInRows(row)"
                    :key="bookable.id"
                    :class="'col-' + col"
                    class="mb-2 d-flex align-items-stretch"
                >
                    <bookable-list-item 
                        :title="bookable.title"
                        :description="bookable.description"
                        :price="bookable.price"
                    ></bookable-list-item>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
import BookableListItem from './BookableListItem'
export default {
    
    components: {
        BookableListItem,
    },
    data () {
        return {
            loading: false,
            columns: 3,
            bookables: null,
        }
    },
    methods: {
        getBookablesInRows (row) {
            let col = this.columns;
            let from = (row - 1) * col;
            let to = row * col;
            let bookables = this.bookables.slice(from, to);
            return bookables;
        },
        fetchBookables () {
            this.loading = true;
            return axios.get('/api/bookables')
                        .then(response => this.setBookables(response.data))
                        .then(result => this.loading = false)
                        
        },
        setBookables (bookables) {
            this.bookables = bookables;
        },
    },
    computed: {
        rows () {
            let length = this.bookables ? this.bookables.length : 0;
            return length ? Math.ceil(length / this.columns) : 0;
        },
        col () {
            return 12 / this.columns;
        },
    },
    created () {
        this.fetchBookables().catch(error => console.log(error))
    }
}
</script>