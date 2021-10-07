<template>
    <div class="container">
        <!-- {{info}} -->
        <span class="edit-team-hd">View and edit teams you are part of</span>
         <div class="card team-card" v-for="team, idx in teams" :key="idx">
            <div class="team-title">
                <h5>{{team.name}}</h5>
            </div>
        
            <span class="team-shorname">{{team.shortName}}</span>
            <p class="team-description">{{team.description}}</p>
            
            <excuseYourself :_Id=team._id service="teams" remove_yourself="remove_member"></excuseYourself>
            <hr>
            <b>Members</b>:
            <span class="team-members" v-for="member, idx in team.members" :key="idx">{{member.email}}</span>

            <addMemberToTeam :_id=team._id ></addMemberToTeam>
            
        </div>

    </div>
    

</template>
<script>
import addMemberToTeam from './common_utils_Components/addMemberToTeam.vue';
import excuseYourself from'./common_utils_Components/excuse_yourself.vue'
import axios from 'axios';
export default {
    name:'viewTeams',
    
    components:{
        addMemberToTeam,
        excuseYourself
    },
    data(){
        return{
            teams:[]
        }
    },
    methods:{
        viewTeams(result){
            result.forEach(response =>{ 
                let team={};
                team._id = response._id;
                team.name = response.name;
                team.shortName = response.shortName;
                team.description = response.description;
                team.members = response.members;
                this.teams.push(team);
                
            })
            // console.log("teams ",this.teams);
        }
    },
    created(){
         axios.get(`https://mymeetingsapp.herokuapp.com/api/teams`)
            .then(result => this.viewTeams(result.data))
            .catch(error => console.log(error));
            
    }


}

</script>

<style scoped>
    
</style>