<template>
    <div>
        <div class="container">
            <h1>Search for meetings</h1>
            <form @submit="searchMeeting" method="get">
                <label for="filter-meet">Date</label>
                <br>
                <select v-model="filter_meet" id="filter-meet">
                    <option value="All">All</option>
                    <option value="Past">Past</option>
                    <option value="Today">Today</option>
                    <option value="Upcoming">Upcoming</option>
                </select>
                
                <br>
                <label for="search-for">Search for</label><br>
                <textarea v-model="description" id="search-for"
                    placeholder="Search using words which describe the meeting"></textarea>
                <br>
                <button class="btn btn-submit" type="submit">Search</button>
            </form>
        </div>
        <div class="container">
             <div class="card meeting-card" v-for="(meeting,idx) in meetings" :key="idx">
                
                    <div class="date-time">
                        <h4> {{meeting.date}} </h4><span class="meet-time">{{meeting.startTime}} - {{meeting.endTime}}</span>
                    </div>
                
                    <span class="meet-title">{{meeting.name}}</span>
                    
                
                    <hr>
                    <span class="meet-attendees">Attendees: 
                        
                        <span class="attendee" v-for="attendee,idx in meeting.attendees" :key="idx">{{attendee}}, </span>

                    
                    </span>
                    <excuseYourself :_Id=meeting._id service="meetings" remove_yourself="remove_attendee"></excuseYourself>
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
        searchMeeting(event){
            event.preventDefault();
            
            // console.log(this.filter_meet, this.description);
           
            // axios.get('https://mymeetingsapp.herokuapp.com/api/meetings?period='+this.filter_meet+'&search='+ this.description)
            axios.get(`https://mymeetingsapp.herokuapp.com/api/meetings?period=${this.filter_meet}&search=${this.description}`)
            .then(result => this.getMeetings(result.data))
            
        },
       
        
    },
}
</script>

<style scoped>
    
</style>