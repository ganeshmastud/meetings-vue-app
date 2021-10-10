<template>
    <div class="col-12 bg-light">
        <nav class="navbar navbar-expand-lg navbar-light bg-light col-11 mx-auto p-0">
            <router-link class="navbar-brand" to="/">MyMeetings</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" 
            data-target="#navbarSupportedContent"
             aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item ">
                        <router-link class="nav-link" to="/">Calendar</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/meetings">Meetings</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link " to="/teams">Teams</router-link>
                    </li>
                    
                    <!-- <li class="nav-item">
                        <router-link to="/" >logut</router-link>
                    </li> -->
                </ul>
                <ul class="nav navbar-nav">
                    <li class="nav-item">
                        <span class="nav-link">
                            Hello {{email}}
                        </span>
                    </li>
                    <li class="nav-item" v-if="isAuthenticated">
                        <span class="nav-link cursor-pointer" @click="logout()">Logout</span>
                    </li>
                     <li class="nav-item" v-else>
                         <router-link class="nav-link " to="/login">Login</router-link>
                     </li>
                </ul>
            
            </div>
        </nav>

    </div>
    


</template>

<script>
// import store from '@/stores/index';
export default {
    name: 'Navbar'
    ,
    computed: {
        // ...mapState( [ 'email' ] ),
        // ...mapGetters( [ 'isAuthenticated' ] )
        email() {
            return this.$store.state.auth.email;
        },
        role() {
            return this.$store.state.auth.role;
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch( 'logout' )
                .then( () => this.$router.push( { name: 'login' } ) );
        }
    }
};
</script>

<style scoped>

</style>



