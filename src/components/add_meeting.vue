<template>
    <div class="container col-11">
        <h2>Add a new meeting</h2>
        <hr>
         <div class="add-meeting">
            <form @submit="addMeeting" method="post">
                <label for="name">name</label> <br>
                <input type="text" id="name" v-model="addMeetingData.name">
                <br>
                <label for="add-date">Date</label>
                <br>
                
                <input type="date" id="add-date" v-model="addMeetingData.date" > <br>
                <label for="start-time">Start time (hh:mm)</label><br>
                <input id="start-time" type="time" v-model="start_Time"><br>
                <label for="end-time">End time (hh:mm)</label><br>
                <input id="end-time" type="time" v-model="end_Time"><br>
                <label for="description">Description</label><br>
                <textarea v-model="addMeetingData.description" id="description"  placeholder="What is the agenda of the meeting?"></textarea>
                <br>
                <label for="add-member">EmailIDs of attendees, or team's short</label><br>
                <input type="text" id="add-members"   placeholder="john@example.com, @annual-day, mark@example.com"
                    v-model="addmembers">
                <br><span class="note">Seperate emailids / team short names by commas - team short names always beginwith @</span> 
                <br>
                <button class="btn btn-submit" type="submit">Add meeting</button>
            </form>
            
        </div>
        
    </div>
    
</template>
<script>
import axios from 'axios';
export default {
    name:'add_meeting',
    data(){
        return {
            start_Time:null,
            end_Time:null,
            addmembers:null,
            // name:null,
            // description:null,
            // date:null
            addMeetingData:{
                name:null,
                description:null,
                date:null,
                startTime:{
                    hours:0,
                    minutes:0
                },
                endTime:{
                    hours:0,
                    minutes:0
                },
                attendees:[]
            }
        }
    },
    methods:{
        addMeeting(event){ //event
            event.preventDefault();
            // console.log(typeof this.start_Time);
            // console.log("start time ",this.start_Time, " end time ",this.end_Time, "members ",this.addmembers);
            // console.log("name ",this.name, " description ",this.description);
            
            this.addMeetingData.startTime.hours=Number(this.start_Time.substr(0,2));
            this.addMeetingData.startTime.minutes=Number(this.start_Time.substr(3,2));
            this.addMeetingData.endTime.hours=Number(this.end_Time.substr(0,2));
            this.addMeetingData.endTime.minutes=Number(this.end_Time.substr(3,2));
            this.addmembers = this.addmembers.replace(' ','')
            let attendees= [];
            attendees= this.addmembers.split(",");
            // this.attendeesObj(attendees);
            this.addMeetingData.attendees = attendees;
            // this.addMeetingData.attendees.forEach((member)=>member.replace(/^\s+|\s+$/gm,''));
            // console.log(this.addMeetingData.attendees, this.addmembers);
            // console.log("addMeeting", this.addMeetingData);
            axios.post('https://mymeetingsapp.herokuapp.com/api/meetings', this.addMeetingData)
            .then( (result) =>{
                console.log(result);
            })
            
        },
        // attendeesObj: function(membersEmails){
        //     membersEmails.forEach((member, idx) =>{
        //         this.addMeetingData.attendees.push({
        //             userId:idx,
        //             email:member
        //         })
            
        //     })
        // }


    }
}
</script>

<style scoped>
    
</style>