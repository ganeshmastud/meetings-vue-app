<template>
    <div>
        <div class="container search-meeting-container col-12   rounded-lg">
            <h3 class="pt-2">Search for meetings</h3>
            <hr>
            <form @submit.prevent="searchMeeting" method="get">
                <label for="filter-meet" class="mb-1">Date</label>
                <br>
                <select v-model="filter_meet"  id="filter-meet" class="col-12 mb-2 p-1" required>
                    <!-- <option value=""></option> -->
                    <option value="All" >All</option>
                    <option value="Past">Past</option>
                    <option value="Today">Today</option>
                    <option value="Upcoming">Upcoming</option>
                </select>
                
                <br>
                <label for="search-for" class="mb-1">Search for</label><br>
                <textarea v-model="description" id="search-for" class="col-12 mb-2"
                    placeholder="Search using words which describe the meeting" required></textarea>
                <br>
                <button class="btn  btn-submit mb-4" @click="checkFormData()" type="submit">Search</button>
            </form>
            <div v-if="checkformdata" class="note">Note: <span>{{checkformdata}}</span></div>
        </div>
        <div class="container col-12 p-0">
            <h3 class="p-0">Meetings matching search criteria</h3>
            <div v-if="error" class="error"><span>{{error}}</span></div>
            <div v-else><span>Number of meeting we are able to find related to your search are {{meetings.length}}.</span></div>
            <hr>
             <div class="card meeting-card pl-2 mb-4  rounded-lg" v-for="(meeting,idx) in meetings" :key="idx">
                <!-- <div class="meet"+"idx"></div> -->
                    <div class="date-time d-flex flex-row ">
                        <h4 class=" mr-3"> {{meeting.date}} </h4><span class="meet-time">{{meeting.startTime}} - {{meeting.endTime}}</span>
                    </div>
                
                    <span class="meet-title">{{meeting.name}}</span>
                    <excuseYourself :_Id=meeting._id  :excuseRequiredProp="excuse_required_prop" 
                    v-on:excuseYourself="excuseYourself()"></excuseYourself>


                    <hr>
                    <span class="meet-attendees">Attendees: 
                        
                        <span class="attendee" v-for="attendee,idx in meeting.attendees" :key="idx">{{attendee}}, </span>

                    
                    </span>
                    <!-- {{meeting._id}} -->
                    <addMemberToMeeting :_id=meeting._id  dat="cool" @memberaddedtomeeting="memberaddedtomeeting"></addMemberToMeeting>
                    
                    <!-- <form @submit="addMemberToMeet" method="post">
                        <select v-model="add_member" id="select-member">
                        <option v-for="member in members" v-bind:value="member" :key="member">
                            {{ member }}
                        </option>
                        
                    </select>
                    
                    <button class="btn btn-success" type="submit">Add</button>
                </form> -->
                <!-- <span v-model="meeting_id=meeting._id"></span> -->
                
            </div>
        </div>
        


    </div>
    
    

</template>

<script>
import axios from 'axios';
import addMemberToMeeting from './common_utils_Components/addMemberToMeeting.vue';
import excuseYourself from'./common_utils_Components/excuse_yourself.vue'
export default {
    name:'search_meetings',
    data(){
        return{
            filter_meet:null,
            description:null,
            add_member:null,
            // meeting_id:null,
            meetings:[],
            error:'',
            checkformdata:'',
            // members:[]
            excuse_required_prop:{
                'service':"meetings",
                'remove_yourself':"remove_attendee",
                'refresh_page':"Search_Meetings"
            }
        }
    },
    // computed:{
    //     noOfMeetings
    // },
    components:{
        addMemberToMeeting,
        excuseYourself
    },
    methods: {
        checkFormData(){
            if(this.filter_meet===null || this.description===null){
                this.checkformdata="Please fill all the details."
            }else{
                 this.checkformdata='';
            }
        },
        excuseYourself(){
            this.searchMeeting();
        },
        memberaddedtomeeting(){
            this.searchMeeting();  
        },
        getAttendess(attendees){
            let members=[];
            attendees.forEach(member=>{
                members.push(member.email);
            });
            return members;
        },

        // //gets all the register user email if and pass it to members array
        // allMembers(){
        //     let members =[];
        //     axios.get('https://mymeetingsapp.herokuapp.com/api/users')
        //     .then(result =>{
        //         result.data.forEach(member =>{
        //             members.push(member.email);
        //         } )
        //     })
        //     return members;
        // },
        getMeetings(result){
             let meeting={};
             result.forEach(meet=>{
                 meeting.name=meet.name;
                 meeting.description=meet.description;
                 meeting.date=meet.date.substring(0,10);
                 meeting.startTime= meet.startTime.hours +':'+meet.startTime.minutes ;
                 meeting.endTime = meet.endTime.hours +':'+meet.endTime.minutes;
                 meeting.attendees = this.getAttendess(meet.attendees);
                 meeting._id= meet._id;
                //  meeting.allMember = this.allMembers();
                // this.members = this.allMembers();
                 this.meetings.push(Object.assign({}, meeting));
             })
             
            //  console.log("meetings ",this.meetings);
            if(this.meetings.length===0){
                this.error="There is no meeting available related to your search."
            }else{
                this.error=""
            }

        },
        searchMeeting(){
            // event
            // event.preventDefault();
            
            // console.log(this.filter_meet, this.description);
           this.meetings=[];
            // axios.get('https://mymeetingsapp.herokuapp.com/api/meetings?period='+this.filter_meet+'&search='+ this.description)
            axios.get(`https://mymeetingsapp.herokuapp.com/api/meetings?period=${this.filter_meet}&search=${this.description}`)
            .then(result => {
                this.getMeetings(result.data)
                this.filter_meet=null;
                this.description=null;
            })
            
        },
       
        
    },
}
</script>

<style scoped>
    .meet-time{
        display: inline-block;
        margin-top:6px;
    }
    .search-meeting-container{
        background-color: #4ea1a1;
    }
    .btn-submit{
         background-color: #276969;
    }
    .btn-submit:hover{
         background-color: #70afaf;
    }
    .meeting-card:hover{
        border: 2px solid goldenrod;
        /* border-color: rgb(150, 146, 137); */
    }
    .error{
        color:red;
    }
    .note{
        color:white;
    }
</style>