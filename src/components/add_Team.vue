<template>
    <div class="container add-team-container col-4 ">
        <div class="add-team-form  pl-2 pr-2 rounded-lg">
            <h3 class="mt-3" style="text-align:center">Add New Team</h3>
            <hr>
            <div v-if="msg" class="error"><span>{{msg}}</span> </div>
             <form @submit.prevent="addTeam" method="post">
                <label for="name" class="mb-1">name</label> <br>
                <input class="col-12 mb-2" type="text" id="name" v-model="addteam.name" required><br>
                
                <label for="shortname" class="mb-1">Short Name</label> <br>
                <input class="col-12 mb-2" type="text" id="shortname" v-model="addteam.shortName" required><br>
                
                <label for="description" class="mb-1">Description</label><br>
                <textarea class="col-12 mb-2" v-model="addteam.description" id="description" 
                 placeholder="What team describes" required></textarea>
                <br>
                
                <label for="add-team" class="mb-1">EmailIDs of attendees, or team's short</label><br>
                <input class="col-12 mb-4" type="text" id="add-team"   
                placeholder="john@example.com, @annual-day, mark@example.com"
                    v-model="addMembers" required>
        
                <button class="btn btn-submit col-12 mb-4" v-on:click="checkforError()" type="submit">Add Team</button>
                
            </form>
            <div class="close-form" @click="closeTeamForm" >
                <span style="display:inline-block">x</span>
            </div>
        </div>  
        
       <!-- {{addTeamForm}} -->
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'addTeam',
    data(){
        return{
            addMembers:null,
            msg:'',
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
            // console.log("reach 1")
            // this.addTeamForm=true;   if data chagne in here it can also be change in parent component
            this.$emit('closeForm',false)
            // console.log("close form event",event);
            // alert(",this.addTeamForm ",true);
        },
        checkforError(){
            if( this.addMembers ===null || this.addteam.name === null || this.addteam.shortName ===null || this.addteam.description ===null){
                this.msg = "Please fill the complete form."
            }else{
                this.msg=''
            }
            // alert(this.msg);
        },
        addTeam(){
            // event.preventDefault();
            

            this.addMembers = this.addMembers.replace(' ','')
            let team_members= [];
            team_members= this.addMembers.split(",");
            this.addteam.members =  team_members;
            console.log(this.addteam);

            axios.post('https://mymeetingsapp.herokuapp.com/api/teams', this.addteam)
            .then( (result) =>{
                console.log(result);
                // this.$emit('reload_data'); //trying to add multiple funciton to emit
                this.closeTeamForm();
                // this.$route.push({name:'/teams'})
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
        background-color: #5eacac;
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
    .btn-submit{
         background-color: #258b8b;
    }
    .btn-submit:hover{
         background-color: #0d9c9c;
    }
    .btn-submit:active{
        background-color: #258383;        

    }
    .error{
        color:red;
    }
    label,h3{
        color:white;
    }
    input, textarea{
        border-radius: 3px;
        border:none;
        outline: none;
    }
    input:hover,  textarea:hover{
        box-shadow: 1px 2px 1px 1px grey;
        
    }
    input:focus, textarea:focus{
        outline: 2px solid rgb(70, 143, 143);
    }
  

</style>