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
                        <button class="btn btn-submit col-12" type="submit">Login</button>
                        <!-- <app-spinner v-if="processing" /> -->
                    </div>
                </form>
                <div class="text-muted">
                    
                    <div class="create-acc">
                        <small>Don't have an account? <router-link to="/signup">SignUp</router-link></small>
                    </div>
                </div>
                <div class="errors">
                    <span>{{error}}</span>
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
                error:'',
                form: {
                    email: '',
                    password: ''
                }
            };
        },
        methods: {
            login() {
                if(this.form.email.length >0 && this.form.password.length > 0){
                    this.$store.dispatch( 'login', this.form )
                    .then( () =>{
                        // console.log(res);
                        // alert("Login Successfully");
                        // setTimeout(()=>{
                        //     this.error="Login Successfully";
                        // },1000)
                        this.error=''
                        this.$router.push(  '/'  );
                    })
                    .catch( err => {
                        // alert(err);
                        console.log("login error :",err);
                        this.error="Please enter correct username and password."
                    });
                }else{
                    this.error="please fill all the form fields."
                }
                
                    // .then(()=>alert("Login successfull"))
            }
        }
    }
</script>

<style scoped>
    .create-acc{
        text-align: center;
    }
    .errors{
        text-align: center;
        color:red;
    }
    label{
        color:black
    }
</style>