<template>
    <div class="container add-team-container col-4 ">
        <div class="add-team-form bg-primary pl-2 pr-2 rounded-lg">
            <h3 style="text-align:center">Add New Team</h3>
            <hr>
             <form @submit="addTeam" method="post">
                <label for="name" class="mb-1">name</label> <br>
                <input class="col-12 mb-2" type="text" id="name" v-model="addteam.name"><br>
                
                <label for="shortname" class="mb-1">Short Name</label> <br>
                <input class="col-12 mb-2" type="text" id="shortname" v-model="addteam.shortName"><br>
                
                <label for="description" class="mb-1">Description</label><br>
                <textarea class="col-12 mb-2" v-model="addteam.description" id="description"  placeholder="What team describes"></textarea>
                <br>
                
                <label for="add-team" class="mb-1">EmailIDs of attendees, or team's short</label><br>
                <input class="col-12 mb-4" type="text" id="add-team"   placeholder="john@example.com, @annual-day, mark@example.com"
                    v-model="addMembers">
        
                <button class="btn btn-success col-12 mb-4" type="submit">Add Team</button>
                
            </form>
            <div class="close-form" @click="closeTeamForm" >
                <span style="display:inline-block">x</span>
            </div>
        </div>  
        
       {{addTeamForm}}
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'addTeam',
    data(){
        return{
            addMembers:null,
            addteam:{
                name:null,
                shortName:null,
                description:null,
                
                members:[]

            }
            
        }
        
    },
    props:{
        addTeamForm:Boolean
    }
    ,
    methods:{
        closeTeamForm: function(){
            console.log("reacg 1")
            // this.addTeamForm=true;   if data chagne in here it can also be change in parent component
            this.$emit('closeForm',false)
            // console.log("close form event",event);
            // alert(",this.addTeamForm ",true);
        },
        addTeam(event){
            event.preventDefault();
            this.addMembers = this.addMembers.replace(' ','')
            let team_members= [];
            team_members= this.addMembers.split(",");
            this.addteam.members =  team_members;
            console.log(this.addteam);

            axios.post('https://mymeetingsapp.herokuapp.com/api/teams', this.addteam)
            .then( (result) =>{
                console.log(result);
            })
            // console.log("data ",this.name, this.shortname,this.description,this.teamMembers);
        }
    }

}
</script>

<style >
    .add-team-container{
        position: relative;
    }
    .add-team-form{
        position:fixed;
        top:5em;
        
        /* margin-top:5em; */
        overflow: hidden;
        
    }
    
    .close-form {
        position: absolute;
        top:0;
        right:0;
        font-size: 1.2em;
        padding:.2em .6em;
        background-color:rgb(218, 2, 2);

    }
    .close-form:hover{
        background-color: rgb(129, 36, 36);
    }
    /* body{
        overflow: hidden;
        
    } */

</style>