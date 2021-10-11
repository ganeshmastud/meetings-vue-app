<template>
    <div class="container col-11 mt-4">
        <h1>Meetings</h1>
        <hr>
        <!-- <input type="radio" name="a" v-model="flag" :value="b" @click="changeVal('b')">
        <input type="radio" name="a" v-model="flag" :value="c" @click="changeVal('c')">
        {{flag}} -->
        <!-- <br> -->
        <div class="component-toggle">
            <input  id="search-meeting" type="radio" name="changeComponent"  :value="search_meetings" 
            @click="changeComponent('search_meetings')">
            <label for="search-meeting" class="toggleComponent" :style="toggleComponent =='search_meetings'?active:''">Search Meetings</label>
            <input  id="add-meeting" type="radio"  name="changeComponent"  :value="add_meeting" 
            @click="changeComponent('add_meeting')">
            <label for="add-meeting" class="toggleComponent"  :style="toggleComponent =='add_meeting'?active:''">Add Meetings</label>
        </div>
        
        <div   v-if="toggleComponent=='search_meetings'">
            <searchMeetings></searchMeetings>
        </div>
        <div   v-else-if="toggleComponent =='add_meeting'">
            <addMeeting></addMeeting>
        </div>
        <!-- <ul class="navbar-nav mr-auto mb-2 d-flex flex-row">
       
        <li class="nav-item ml-3">
            <router-link class="nav-link" :to="toggleComponent">Search Meetings</router-link>
        </li>
        <li class="nav-item ml-3">
            <router-link class="nav-link" :to="toggleComponent">Add Meeting</router-link>
        </li>
        </ul>
         <router-view ></router-view> -->
    </div>

</template>

<script>
import searchMeetings from '@/components/search_meeting';
import addMeeting from '@/components/add_meeting';
export default {
    name:'Meetings',
    components:{
        searchMeetings,
        addMeeting
    },
    data(){
        return{
            toggleComponent:'search_meetings',
            // flag:''
            active:{
                // 'position':'absolute',
                'border':'1px solid black',
                'margin-bottom':'-2px',
                'background-color':'white',
                'padding':'8px',
                'border-bottom':'5px solid white',
                'box-sizing':'content-box',
                'border-top-left-radius': '3px',
                'border-top-right-radius': '3px'

            }
        }
    },
    methods:{
        changeComponent(data){
            this.toggleComponent=data;
        },
        changeVal(data){
            this.flag=data;
        }
    }

}
</script>

<style scoped>
    #search-meeting{
        visibility: hidden;
    }
    #add-meeting{
        visibility: hidden;
    }
    .component-toggle{
        margin-bottom:.5em;
        border-bottom:1px solid black;
        box-sizing:content-box;
         /* position:relative; */
    }
    .toggleComponent{
        margin-bottom: 0px;
        box-sizing:content-box;
        color:black
    }
    
</style>