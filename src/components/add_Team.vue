<template>
    <div class="container">
        <form @submit="addTeam" method="post">
             <label for="name">name</label> <br>
             <input type="text" id="name" v-model="addteam.name"><br>
             <label for="shortname">Short Name</label> <br>
             <input type="text" id="shortname" v-model="addteam.shortName"><br>
            <label for="description">Description</label><br>
            <textarea v-model="addteam.description" id="description"  placeholder="What team describes"></textarea>
            <br>
            <label for="add-team">EmailIDs of attendees, or team's short</label><br>
            <input type="text" id="add-team"   placeholder="john@example.com, @annual-day, mark@example.com"
                v-model="addMembers">
            <br>
                <button class="btn btn-submit" type="submit">Add Team</button>
             
        </form>
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
    methods:{
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