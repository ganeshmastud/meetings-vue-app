<template>
    <div class="container view-teams-container col-12 p-0">
        <!-- {{info}} -->
        <span class="edit-team-hd">View and edit teams you are part of</span>
        <div class="d-flex justify-content-between flex-row flex-wrap">
            <div class="card team-card pl-2  mb-4" v-for="team, idx in teams" :key="idx">
                <div class="team-title">
                    <h5>{{team.name}}</h5>
                </div>
            
                <span class="team-shorname">{{team.shortName}}</span>
                <p class="team-description">{{team.description}}</p>
                
                <excuseYourself :_Id=team._id service="teams" remove_yourself="remove_member"></excuseYourself>
                <hr>
                <b>Members :</b>
                <span class="team-members" v-for="member, idx in team.members" :key="idx">{{member.email}},</span>

                <addMemberToTeam :_id=team._id ></addMemberToTeam>
                
            </div>
            <div class="card team-card addTeam pl-2  mb-4 d-flex justify-content-lg-center justify-content-md-center
            align-items-md-center align-items-lg-center"  @click="teamForm=!teamForm"> 
                <span @click="teamForm=!teamForm" class="add-team">+</span>
                
            </div>
            <div class="card team-card pl-2  mb-4 border-0"></div>
            <div class="card team-card pl-2  mb-4 border-0"></div>
        </div>
        <div class="child-to-parent"  >
        </div>
         <div v-if="teamForm" class="addTeamForm" >
             <!-- closeAddTeamForm($event)  -->
                <addTeam  :addTeamForm=teamForm v-on:closeForm="closeAddTeamForm($event)"></addTeam>
        </div>

    </div>
    

</template>
<script>
import addTeam from './add_Team.vue'
import addMemberToTeam from './common_utils_Components/addMemberToTeam.vue';
import excuseYourself from'./common_utils_Components/excuse_yourself.vue'
import axios from 'axios';
export default {
    name:'viewTeams',
    
    components:{
        addTeam,
        addMemberToTeam,
        excuseYourself
    },
    data(){
        return{
            teams:[],
            teamForm:false
        }
    },
    methods:{
        closeAddTeamForm: function(data){
            // console.log("reaced here");
            // alert("data", data);
            this.teamForm = data;
            // console.log("teamform state: ",this.teamForm);
        },
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
    /* .team-title{
        font-weight: 900;
    } */
    .team-card{
        width:100%
    }
    .team-shorname{
        font-weight: 700;
    }
    
    .add-team{
        display: inline-block;
        font-size: 3em;  
    }
    .team-members{
        display: inline-block;
    }
     @media only screen and (max-width: 700px) {
         .addTeam{
             width:10em;
            /* padding:2em; */
            
        }
        .add-team{
            margin: 0 auto ;
            padding:.5em;
            padding-top:.2em;
            /* text-align: center; */
        }
     }
    
    @media only screen and (min-width: 700px) {
        .team-card{
        width:48%
        }
    }
    @media only screen and (min-width: 900px) {
        .team-card{
        width:32%
        }
        .addTeam{
            height: 316px;
        }
    }
    
</style>