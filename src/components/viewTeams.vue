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
                
                <excuseYourself :_Id=team._id :excuseRequiredProp="excuse_required_prop" 
                 v-on:excuseYourself="excuseYourself()"></excuseYourself>
                <hr>
                <div class="all-team-members">
                    <b>Members :</b>
                    <div class="team-members" :style="team.members.length>3? scrollmembers:scrollhidden">
                        <div class="team-member" v-for="member, idx in team.members" :key="idx">{{member.email}},</div>

                    </div>

                </div>
                
                <addMemberToTeam :_id=team._id v-on:memberaddedtoteam="memberaddedtoteam()"></addMemberToTeam>
                
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
                <addTeam  :addTeamForm=teamForm v-on:closeForm="closeAddTeamForm($event)" ></addTeam>
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
            teamForm:false,
            scrollmembers:{
                'overflow-y':'scroll'
            },
            scrollhidden:{
                'overflow':'hidden'
            },
            excuse_required_prop:{
                'service':"teams",
                'remove_yourself':"remove_member",
                'refresh_page':"Teams"
            }
            // service="teams"    remove_yourself="remove_member" refresh_page="/teams"
        }
    },
    methods:{
        excuseYourself(){
            console.log("you excuse yourself")
            this.getTeams();
        },
        memberaddedtoteam:function(){
            console.log("member added to team");
            this.getTeams();
        },
        closeAddTeamForm: function(data){
            // console.log("reaced here");
            // alert("data", data);
            this.teamForm = data;
            this.getTeams();  
            // console.log("teamform state: ",this.teamForm);
        },
        viewTeams(result){
             this.teams=[],
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
        },
        getTeams(){
            axios.get(`https://mymeetingsapp.herokuapp.com/api/teams`)
            .then(result => this.viewTeams(result.data))
            .catch(error => console.log(error));
        } 
       
    },
    created(){
            this.getTeams();    
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
    .team-member{
        display: block;
        
    }
    .team-card:hover{
        border:2px solid goldenrod;
    }
    .team-members{
        height:4em;
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