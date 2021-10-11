<template>
    <div class="container my-4">
        <div class="row">
            <div class="offset-0 offset-md-3 col-12 col-md-6">
                <h1 style="text-align:center">SignUp</h1>
                <hr />
                <form name="form" @submit.prevent="signup">
                    <div class="form-group">
                        <label for="username">Name</label>
                        <input
                            type="text"
                            class="form-control"
                            name="username"
                            id="username"
                            placeholder="john doe"
                            v-model="form.name"
                        />
                    </div>
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
                        <label for="retype_password">Retype Password</label>
                        <input
                            type="password"
                            autocomplete="off"
                            class="form-control"
                            name="retype_password"
                            id="retype_password"
                            v-model="form.retype_password"
                        />
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary col-12" type="submit">SignUp</button>
                        <!-- <app-spinner v-if="processing" /> -->
                    </div>
                </form>
                <div class="text-muted">
                    <div>
                        <small><strong>NOTE</strong></small>
                    </div>
                    <div>
                        <small>Already have an account? <router-link to="/Login">SignIn</router-link></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    // import Vue from 'vue';
    // import config from '@/config';
    export default {
        name: 'SignUp',
        data() {
            return {
                processing: false,
                form: {
                    name:'',
                    email: '',
                    password: '',
                    retype_password:''
                }
            };
        },
        methods: {
            signup (){
                const credentials = {
                    
                     };
                credentials.name = this.form.name;
                credentials.email = this.form.email;
                credentials.password = this.form.password;
                // console.log("register data: ",this.form)
                // https://mymeetingsapp.herokuapp.com/api/auth/register
                // this.$router.push(  '/'  )
                axios.post(
                'https://mymeetingsapp.herokuapp.com/api/auth/register',
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then( this.$router.push(  '/Login'  ) )
                .catch( (error)=>alert(error.message) );
            }
        }
    }
</script>

<style scoped>

</style>