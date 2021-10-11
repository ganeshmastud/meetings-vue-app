
<template>
    <div class="container col-12 p-0 mt-2 mb-2">
        <!-- <span>meet id {{_id}} {{dat}}</span> -->
         <form @submit="addMemberToMeet" method="post">
                <select  v-model="add_member" id="select-member">
                <option disabled value="">Please select one</option>
                <option v-for="member,idx in members" v-bind:value="member" :key="idx">
                    {{ member.email }}
                </option>
                
            </select>
            
            <button class="btn btn-success ml-2 " @click="checkIfmemberAdded" type="submit">Add</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'addMemberToMeeting',
    data(){
        return{
            add_member:'',
            members:[]
           
        }
     
    },  //_id ==meeting id in props
    props:{
        _id:String,
        dat:String
    },
    methods:{
        //gets all the register user email if and pass it to members array
        checkIfmemberAdded(){
            if(this.add_member.length<=0){
                this.error="Please select member.";
            }else{
                this.error='';
            }
        },
        
         async addMemberToMeet(event){
            event.preventDefault();
            // console.log("id ",this.meeting_id);
            // console.log("member ",this._id);
            const userId=this.add_member.userId;
            // const add_attendee = this.add_member.email;
            const meetingId=this._id;
            // axios.patch(`https://mymeetingsapp.herokuapp.com/api/meetings/${meetingId}`,{},
            // { params:{action: add_attendee, userId: userId} }).
            // then(result => console.log("result",result)).
            // catch(error => console.log("err ", error));
            // const response = 
             await axios.patch(
                `https://mymeetingsapp.herokuapp.com/api/meetings/${meetingId}`,
                {},
                {
                    params: {
                        action: "add_attendee",
                        userId: userId,
                    }
                }
            ).then(result => {
                console.log("member added to meet",result);
                this.add_member=''
                this.$emit('memberaddedtomeeting');
            });
            // console.log(response);

            //?action=${this.add_member.email}&userId=${this.add_member._id})
            // axios.patch()
        }
    },
    created(){
        // allMembers:function allMembers(){
            // console.log("meetid ",this._id);
            // console.log("dat", this.props.dat);
        let members =[];
         axios.get('https://mymeetingsapp.herokuapp.com/api/users')
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
    #select-member{
        padding:0.35em;
        /* width:7em; */
    }
    .btn{
        margin-top:-5px;
    }
    /* @media only screen and (min-width: 400px) {
         #select-member{
             width:10em;
         }
    } */
    @media only screen and (max-width: 500px) {
         #select-member{
             width:12em;
         }
    }
</style>