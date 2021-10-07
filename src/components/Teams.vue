<template>
    <div class="container">
        <h1> Teams</h1> 
        <button @click="teamForm=!teamForm">Add Team</button>
        <div v-if="teamForm" class="addTeamForm">
        <addTeam ></addTeam>
        </div>
        
        <viewTeams ></viewTeams>
    </div>
    
</template>

<script>
import addTeam from './add_Team.vue'
import viewTeams from './viewTeams.vue'

export default {
    name:'Teams',
    data(){
        return{
            teamForm:false
        }
    },
    components:{

        addTeam,
        viewTeams
    }

}
</script>

<style scoped>
    
</style>