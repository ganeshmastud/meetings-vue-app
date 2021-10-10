<template>
    <div>
        <button class="btn btn-danger" @click="excuseYourself">Excuse yourself</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'excuseYourself',
    props:{
        _Id:String,
        service:String,
        remove_yourself:String
    },
    methods:{
        excuseYourself(event){
            event.preventDefault();
            const _Id =this._Id;
            const service = this.service;
            const remove_yourself =this.remove_yourself;
            // console.log(" meet id ", this.meeting_Id);    
            axios.patch(`https://mymeetingsapp.herokuapp.com/api/${service}/${_Id}`,
            {},{params:{action:remove_yourself}}).
            then(result => console.log(result))
            .catch(error => console.log("err ",error));
        }

    }
}
</script>
