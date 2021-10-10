<template>
    <div class="container col-11">
        <h1>Meetings</h1>
        <hr>
        <ul class="navbar-nav mr-auto d-flex flex-row">
       
        <li class="nav-item ml-3">
            <router-link class="nav-link" to="/search_meetings">Search Meetings</router-link>
        </li>
        <li class="nav-item ml-3">
            <router-link class="nav-link" to="/add_meeting">Add Meeting</router-link>
        </li>
        </ul>
         <router-view></router-view>
    </div>

</template>

<script>
export default {
    name:'Meetings'

}
</script>

<style scoped>
    
    
</style>