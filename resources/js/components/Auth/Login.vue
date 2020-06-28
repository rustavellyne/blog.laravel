<template>
    <div class="d-flex w-50 m-auto align-items-center">
        <div class="card card-body">
            <form>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input 
                        v-model="email" 
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
                        v-model="password" 
                        type="password"
                        name="password" 
                        placeholder="Enter your password" 
                        class="form-control"
                        :class="[{'is-invalid': errorFor('password')}]"
                    />
                    <v-errors :errors="errorFor('password')"></v-errors>
                </div>
                <button @click.prevent="login" :disabled="loading" type="submit" class="btn btn-primary btn-lg btn-block">Log-in</button>

                <hr />

                <div class="text-nowrap">
                    No accounts yet?
                    <router-link :to="{name: 'register'}">Register</router-link>
                </div>

                <div class="text-nowrap">
                    Forgotten password?
                    <router-link :to="{name: 'home'}">Reset password</router-link>
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
            email: null,
            password: null,
        }
    },
    methods: {
        async login () {
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