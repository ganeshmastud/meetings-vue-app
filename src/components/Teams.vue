<template>
    <div class="container team-container col-11">
        <h1> Teams</h1> 
        <hr>
        <viewTeams ></viewTeams>
        
        
        
    </div>
    
</template>

<script>
// import addTeam from './add_Team.vue'
import viewTeams from './viewTeams.vue'

export default {
    name:'Teams',
    data(){
        return{
            teamForm:false
        }
    },
    components:{

        // addTeam,
        viewTeams
    }

}
</script>

<style scoped>
    
</style>