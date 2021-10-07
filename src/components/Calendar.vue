<template>
    
    <div class="container col-11">
        <h2> Calendar </h2>
        <div class="calendar-date d-flex justify-content-between">
            <div class="display-date">
                <span>{{date_pick}}</span>
            </div>
            <div class="input-date ">
                <!-- <form action=""> -->
                    <input type="date" @input="fetchMeetingsData" v-model="date_pick" lang ="en"  format="YYYY-MM-dd">
                <!-- </form> -->
                
            </div>
        </div>
        
        <div class="meetings-in-day position-relative">
            <!-- .hours>(.meeting-hr-$>span.${$}+div.hour.hr-$)*24 -->
            <ul>
                <li v-for="item in 24" class="d-flex" :key="item">
                    <span class="hour">{{item}}</span>
                    <!-- <span class="hour" v-if="item < 10">{{ item }} 	&thinsp;</span> 
                    <span class="hour" v-else>{{ item }} </span>  -->
                    <span class="time"></span>
                </li>
            </ul>
            <div class="calendar-meetings">
                <div class="meetings" v-for="(meeting,idx) in meetings" :key="idx" >
                    <div class="meet position-absolute" v-bind:style="{top:meeting.top +'px' , height:meeting.height+'px'}"> 
                        <span claas="meetName" >{{meeting.meeting_name}}</span><br> 
                        <span class="attendee" v-for="attendee,idx in meeting.attendees" :key="idx">{{attendee}}, </span>
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
</template>




<script>


 
 
import axios from 'axios';
// import { prototype } from 'vue/types/umd';
export default {
    name: 'Calendar',
    data () {
    return {
      info: null,
      date_pick:'2021-09-16',
      meetings:[],
    //    meeting:{
    //         start_time:0.0,
    //         end_time:0.0,
    //         meeting_name:'',
    //         meeting_descr:'',
    //         attendees:[],
    //         top:0,
    //         height:0
    //     }
    }
  },
  methods:{
     
      get_meetings: function(response){
           console.log(response);
       
          response.forEach((item)=>{
            //   meeting.start_time=
            // console.log(item);
              let  meeting={};
               meeting.attendees=[];
                meeting.start_time=  Number(item.startTime.hours +'.'+ item.startTime.minutes) ; //parseFloat
                // console.log("st time ",this.meeting.start_time, item.startTime.minutes);
                // this.meeting.start_time+= item.startTime.minutes*.1;
                meeting.end_time= parseFloat( item.endTime.hours +'.'+ item.endTime.minutes);
                // this.meeting.end_time+= item.endTime.minutes*;
                console.log(meeting.end_time , meeting.start_time, item.endTime.minutes);
                meeting.meeting_name = item.name;
                meeting.meeting_descr = item.description;
                item.attendees.forEach((member)=>{
                    meeting.attendees.push(member.email);
                    // console.log("mem", member);
                });
                if(Math.abs(meeting.end_time -  meeting.start_time) <= 1 && 
                   meeting.start_time - parseInt( meeting.start_time) <= 0 ){
                    meeting.height = Math.abs(item.startTime.hours - item.endTime.hours)*40 + 
                (Math.abs(item.endTime.minutes - item.startTime.minutes)/60)*40 ;


                meeting.top = Math.abs(meeting.start_time-1)*43+30;        
                } else if(meeting.start_time - parseInt( meeting.start_time) > 0 && 
                    Math.abs(meeting.end_time -  meeting.start_time) > 1){
                         meeting.height = Math.abs(item.startTime.hours - item.endTime.hours)*44 + 
                (Math.abs(item.endTime.minutes - item.startTime.minutes)/60)*44 ;


                meeting.top = Math.abs(meeting.start_time-1)*43+35; 

                } else{
                     meeting.height = Math.abs(item.startTime.hours - item.endTime.hours)*42 + 
                (Math.abs(item.endTime.minutes - item.startTime.minutes)/60)*42 ;

                meeting.top = Math.abs(meeting.start_time-1)*43+30;    
                }

               
                
                // console.log("st ",  this.meeting.top);
                console.log(meeting.height);
                this.meetings.push(Object.assign({}, meeting));
                // this.meeting.start_time=0.0;
                // this.meeting.end_time=0.0;
                // this.meeting.meeting_name='';
                // this.meeting.meeting_descr='';
                // this.meeting.attendees=[];
                // this.meeting.height =0;
                // this.meeting.top = 0;
                
          });
        this.info=this.meetings;
        // console.log("info ",this.info);
      },
       fetchMeetingsData: function (){
            // console.log(this.date_pick);
            // console.log("event", event);
            this.meetings=[];
            axios
        .get('https://mymeetingsapp.herokuapp.com/api/calendar?date='+this.date_pick)
        .then(response => (this.get_meetings(response.data)));
        }

  },
  created () {
    //   console.log(typeof this.date_pick);
     axios
      .get('https://mymeetingsapp.herokuapp.com/api/calendar?date='+this.date_pick)
      .then(response => (this.get_meetings(response.data)))
    }
    
};



</script>

<style scoped>
    ul{
        padding: 0;
        padding-top:2em ;
    }
    li{
        list-style-type: none;
    }
    .hour{
        width:1.4em;
        
    }
    .time{
        display: inline-block;
        width: 100%;
        
        height: 40px;
        margin-bottom: .2em;
        background-color: aqua;
    }
    .display-date{
        padding-top:.4em;
    }
    .meet{
        width: 97.5%;  
        display: inline-block;
        margin-top:.3rem;
        margin-left:1.5rem;
        background-color: lightgrey;
        font-size: .8em;
        padding-left:.5rem ;
    }
    

</style>