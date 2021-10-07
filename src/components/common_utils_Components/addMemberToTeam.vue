
<template>
    <div class="container">
        <!-- <span>meet id {{_id}} {{dat}}</span> -->
         <form @submit="addMemberToTeam" method="post">
                <select v-model="add_member" id="select-member">
                <option v-for="member,idx in members" v-bind:value="member" :key="idx">
                    {{ member.email }}
                </option>
                
            </select>
            
            <button class="btn btn-success" type="submit">Add</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'addMemberToTeam',
    data(){
        return{
            add_member:null,
            members:[]
           
        }
     
    },  //_id ==meeting id in props
    props:{
        _id:String,
    },
    methods:{
        //gets all the register user email if and pass it to members array
        
        
        async addMemberToTeam(event){
            event.preventDefault();
            // console.log("id ",this.meeting_id);
            // console.log("member ",this._id);
            const userId=this.add_member.userId;
            // const add_attendee = this.add_member.email;
            const teamId=this._id;
            // axios.patch(`https://mymeetingsapp.herokuapp.com/api/meetings/${meetingId}`,{},
            // { params:{action: add_attendee, userId: userId} }).
            // then(result => console.log("result",result)).
            // catch(error => console.log("err ", error));
            // const response = 
            await axios.patch(
                `https://mymeetingsapp.herokuapp.com/api/teams/${teamId}`,
                {},
                {
                    params: {
                        action: "add_member",
                        userId: userId,
                    }
                }
            ).then(result => console.log(result));
            // console.log(response);

            //?action=${this.add_member.email}&userId=${this.add_member._id})
            // axios.patch()
        }
    },
    async created(){
        // allMembers:function allMembers(){
            // console.log("meetid ",this._id);
            // console.log("dat", this.props.dat);
        let members =[];
       await axios.get('https://mymeetingsapp.herokuapp.com/api/users')
        .then(result =>{
            result.data.forEach(member =>{
                let obj={}
                obj.email=member.email;
                obj.userId=member._id;
                members.push(obj);
            } )
        })
        this.members= members;
        // }
    }

    
}
</script>

<style scoped>
    
</style>