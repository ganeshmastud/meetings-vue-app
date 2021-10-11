<template>
    <div>
        <button class="btn btn-danger" @click="excuseYourself">Excuse yourself</button>
        <!-- {{exuce_required}} -->
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'excuseYourself',
    props:{
         excuseRequiredProp:Object,
        _Id:String,
        // service:String,
        // remove_yourself:String,
        // refresh_page:String,
       
    },
    computed:{
        exuce_required(){
            return this.excuseRequiredProp;
        }
         
    },
    methods:{
        excuseYourself(){
            // event.preventDefault();
            console.log("refreshpage :", this.excuseRequiredProp);
            const _Id =this._Id;
            const service = this.excuseRequiredProp.service;
            const remove_yourself =this.excuseRequiredProp.remove_yourself;
            const refreshpage =this.excuseRequiredProp.refreshpage
            console.log(refreshpage);
            // console.log(" meet id ", this.meeting_Id);    
            axios.patch(`https://mymeetingsapp.herokuapp.com/api/${service}/${_Id}`,
            {},{params:{action:remove_yourself}})
            .then(() => {
                console.log("you left the meeting");
                this.$emit('excuseYourself');
            }
            )
            .catch(error => console.log("err ",error));
        }

    }
}
</script>
