<template>
    <div>
        <div class="container search-meeting-container col-12   rounded-lg">
            <h3 class="pt-2">Search for meetings</h3>
            <hr>
            <form @submit.prevent="searchMeeting" method="get">
                <label for="filter-meet" class="mb-1">Date</label>
                <br>
                <select v-model="filter_meet"  id="filter-meet" class="col-12 mb-2 p-1">
                    <!-- <option value=""></option> -->
                    <option value="All" >All</option>
                    <option value="Past">Past</option>
                    <option value="Today">Today</option>
                    <option value="Upcoming">Upcoming</option>
                </select>
                
                <br>
                <label for="search-for" class="mb-1">Search for</label><br>
                <textarea v-model="description" id="search-for" class="col-12 mb-2"
                    placeholder="Search using words which describe the meeting"></textarea>
                <br>
                <button class="btn btn-success mb-5" type="submit">Search</button>
            </form>
        </div>
        <div class="container col-12 p-0">
            <h3 class="p-0">Meetings matching search criteria</h3>
            <hr>
             <div class="card meeting-card pl-2 mb-4  rounded-lg" v-for="(meeting,idx) in meetings" :key="idx">
                
                    <div class="date-time d-flex flex-row ">
                        <h4 class=" mr-3"> {{meeting.date}} </h4><span class="meet-time">{{meeting.startTime}} - {{meeting.endTime}}</span>
                    </div>
                
                    <span class="meet-title">{{meeting.name}}</span>
                    <excuseYourself :_Id=meeting._id  :excuseRequiredProp="excuse_required_prop" 
                    v-on:updatedata="searchMeeting()"></excuseYourself>


                    <hr>
                    <span class="meet-attendees">Attendees: 
                        
                        <span class="attendee" v-for="attendee,idx in meeting.attendees" :key="idx">{{attendee}}, </span>

                    
                    </span>
                    <!-- {{meeting._id}} -->
                    <addMemberToMeeting :_id=meeting._id  dat="cool"></addMemberToMeeting>
                    
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
            // members:[]
            excuse_required_prop:{
                'service':"meetings",
                'remove_yourself':"remove_attendee",
                'refresh_page':"Search_Meetings"
            }
        }
    },
    components:{
        addMemberToMeeting,
        excuseYourself
    },
    methods: {
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
             
             console.log("meetings ",this.meetings);

        },
        searchMeeting(){
            // event
            // event.preventDefault();
            
            // console.log(this.filter_meet, this.description);
           this.meetings=[];
            // axios.get('https://mymeetingsapp.herokuapp.com/api/meetings?period='+this.filter_meet+'&search='+ this.description)
            axios.get(`https://mymeetingsapp.herokuapp.com/api/meetings?period=${this.filter_meet}&search=${this.description}`)
            .then(result => this.getMeetings(result.data))
            
        },
       
        
    },
}
</script>

<style scoped>
    .meet-time{
        display: inline-block;
        margin-top:1px;
    }
    .search-meeting-container{
        background-color: #4ea1a1;
    }

</style>