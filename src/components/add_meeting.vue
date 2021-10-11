<template>
    <div class="container add-meeting-container col-12 pr-2  rounded-lg">
        <h3 class="pt-2">Add a new meeting</h3>
        <hr>
         <div class="add-meeting">
            <form @submit="addMeeting" method="post">
                <label for="name" class="mb-1">name</label> <br>
                <input type="text" class="col-12 mb-2" id="name" v-model="addMeetingData.name" required>
                <br>
                <label for="add-date" class="mb-1">Date</label>
                <br>
                
                <input type="date" class="col-12 mb-2" id="add-date" v-model="addMeetingData.date" required> <br>
                <label for="start-time" class="mb-1">Start time (hh:mm)</label><br>
                <input id="start-time" class="mb-2" type="time" v-model="start_Time" required><br>
                <label for="end-time" class="mb-1">End time (hh:mm)</label><br>
                <input id="end-time" class="mb-2" type="time" v-model="end_Time" required><br>
                <label for="description" class="mb-1">Description</label><br>
                <textarea class="col-12 mb-2" v-model="addMeetingData.description" id="description" 
                 placeholder="What is the agenda of the meeting?" required></textarea>
                <br>
                <label for="add-member" class="mb-1">EmailIDs of attendees, or team's short</label><br>
                <input type="text" class="col-12" id="add-members"   placeholder="john@example.com, @annual-day, mark@example.com"
                    v-model="addmembers" required>
                <br><span class="note mb-3">Seperate emailids / team short names by commas - team short names always beginwith @</span> 
                <br>
                <button class="btn btn-submit mb-4" @click="checkFormData()" type="submit">Add meeting</button>
            </form>
             <div v-if="checkformdata" class="note"> <span>{{checkformdata}}</span></div>
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
            },
            checkformdata:''
        }
    },
    methods:{
        checkFormData(){
            if(this.start_Time ===null || this.end_Time === null ||
                this.addmembers === null || this.addMeetingData.name===null|| 
                this.addMeetingData.description ===null || this.addMeetingData.date ===null)
                {
                    this.checkformdata="Please fill all the details."
                }else{
                    this.checkformdata='';
                }
        },
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
                for(let property in this.addMeetingData){
                    if(property == 'startTime' || property == 'endTime'){
                        this.addMeetingData[property].hours=0;
                        this.addMeetingData[property].minutes=0;
                    }else{
                        this.addMeetingData[property]=null;
                    }
                    
                }
                this.start_Time=null;
                this.end_Time=null;
                this.addmembers=null;

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
    .note{
        display: inline-block;
        color:white;
    }
    .add-meeting-container{
        background-color: #5eacac;
    }
    .btn-submit{
         color:white;
         background-color: #258b8b;
    }
    .btn-submit:hover{
         background-color: #0d9c9c;
    }
    .btn-submit:active{
        background-color: #258383;        

    }
    label,h3{
        color:white;
    }
    .note{
        color:white;
    }
</style>