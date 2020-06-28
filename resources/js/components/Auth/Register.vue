<template>
    <div class="d-flex w-50 m-auto align-items-center">
        <div class="card card-body">
            <form>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input 
                        v-model="user.name" 
                        type="text"
                        name="name" 
                        placeholder="Enter your name" 
                        class="form-control"
                        :class="[{'is-invalid': errorFor('name')}]"
                    />
                    <v-errors :errors="errorFor('name')"></v-errors>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input 
                        v-model="user.email" 
                        type="email"
                        name="email" 
                        placeholder="Enter your email" 
                        class="form-control"
                        :class="[{'is-invalid': errorFor('email')}]"
                    />
                    <v-errors :errors="errorFor('email')"></v-errors>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        v-model="user.password" 
                        type="password"
                        name="password" 
                        placeholder="Enter your password" 
                        class="form-control"
                        :class="[{'is-invalid': errorFor('password')}]"
                    />
                    <v-errors :errors="errorFor('password')"></v-errors>
                </div>

                <div class="form-group">
                    <label for="password_confirmation">Re-type Password</label>
                    <input 
                        v-model="user.password_confirmation" 
                        type="password"
                        name="password_confirmation" 
                        placeholder="Re-type your password" 
                        class="form-control"
                        :class="[{'is-invalid': errorFor('password_confirmation')}]"
                    />
                    <v-errors :errors="errorFor('password_confirmation')"></v-errors>
                </div>
                <button @click.prevent="register" :disabled="loading" type="submit" class="btn btn-primary btn-lg btn-block">Register</button>

                <hr />

                <div class="text-nowrap">
                    Already have account?
                    <router-link :to="{name: 'login'}">Log-in</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import validationErrors from './../shared/mixins/validationErrors';
import { isLoggedIn, logIn, logOut } from "../../components/shared/utils/auth";
export default {
    mixins: [validationErrors],
    data () {
        return {
            loading: false,
            user: {
                name: null,
                email: null,
                password: null,
                password_confirmation: null,
            },
        }
    },
    methods: {
        async register () {
            this.loading = true;
            this.errors = null;
            try {
                await axios.get('/sanctum/csrf-cookie');
                await axios.post('/login', {
                    email: this.email,
                    password: this.password,
                });
                logIn();
                this.$store.dispatch('loadUser');
                this.$router.push({name: 'home'});
            } catch (error) {
                this.errors = error.response && error.response.data.errors;
            }

            this.loading = false;
        },
    }
}
</script>