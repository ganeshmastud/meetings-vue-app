<template>
    <div class="container my-4">
        <div class="row">
            <div class="offset-0 offset-md-3 col-12 col-md-6">
                <h1 style="text-align:center">Login</h1>
                <hr />
                <form name="form" @submit.prevent="login">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            name="email"
                            id="email"
                            placeholder="john.doe@example.com"
                            v-model="form.email"
                        />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            autocomplete="off"
                            class="form-control"
                            name="password"
                            id="password"
                            v-model="form.password"
                        />
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary col-12" type="submit">Login</button>
                        <!-- <app-spinner v-if="processing" /> -->
                    </div>
                </form>
                <div class="text-muted">
                    <div>
                        <small><strong>NOTE</strong></small>
                    </div>
                    <div>
                        <small>Don't have an account? <router-link to="/signup">SignUp</router-link></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import Vue from 'vue';
    // import config from '@/config';
    export default {
        name: 'AppLogin',
        data() {
            return {
                processing: false,
                form: {
                    email: '',
                    password: ''
                }
            };
        },
        methods: {
            login() {
                this.$store.dispatch( 'login', this.form )
                    .then( () => this.$router.push(  '/'  ) )
                    
                    .catch( error => {
                        alert( error.message );
                    });
                    // .then(()=>alert("Login successfull"))
            }
        }
    }
</script>

<style scoped>

</style>