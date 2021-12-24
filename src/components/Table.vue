
<template>
    <div class="container table-container">
        <h1> Nutrition table</h1>
        <div class="search-bar">
            <input type="text" class="search" placeholder="Search" v-model="searchfield">
            <!-- {{searchfield}} -->
        </div>
        <div class="show-table">   
            <table class="table">
            <thead>
                
                <tr> 
                    <!--  v-on:click="sortByField(idx)" -->
                    <th class="heading" v-on:click="sortByField(item)" v-for="idx,item in table_header" :key=idx scope="col">
                        {{table_header[item]}} 
                        <span v-if="lables[item]"><i class="fas fa-long-arrow-alt-up"></i></span> 
                        <span v-else><i class="fas fa-long-arrow-alt-down"></i></span> 
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="idx,item in operation" :key=idx>
                    <!-- <th>{{nutrition_data[item]}}</th> -->
                    <!-- <th>{{nutritionData[item]}}</th> -->
                    <th class="table-content" v-for="(value, name, idx) in operation[item]" :key=idx>{{value}}</th>
                </tr>
            </tbody>
        </table>

        </div>
        <!-- <u>
            <li v-for="item in operation" :key=item>{{item}}</li>
        </u> -->
        
        <!-- <u>
            <li v-for="item in nutritionData" :key=item>{{item}}</li>
        </u> -->
        <!-- {{nutritionData}} -->
    </div>
</template>

<script>
import nutrition_data from '../nutrition_data'
export default {
    name:'data_table',
     data(){
        return{   
            nutrition_data:[...nutrition_data],
            table_header:Object.keys(nutrition_data[0]),
            lables:[false,false,false,false,false,false],
            searchfield:''
        }
    },
    methods:{
        // getData(){
        //     this.table_header = Object.keys(nutrition_data[0])
        //     console.log(this.table_header);
        // },
        sortByField(field_idx){
            if(!this.labels[field_idx]) {
                console.log("in acs",this.labels[field_idx],field_idx)
                this.nutrition_data.sort(this.acsByField(this.table_header[field_idx]))
            } else {
                console.log("in decs",this.labels[field_idx],field_idx)
                this.nutrition_data.sort(this.descByField(this.table_header[field_idx]))
            }
            
            this.labels[field_idx] =  !this.labels[field_idx];
            // console.logs("hry ",this.nutrition_data);
        },
        acsByField(fieldName){
            
            return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
        },
        descByField(fieldName){
            return (a, b) => a[fieldName] > b[fieldName] ? -1 : 1;
        },
        setLabels(){
            //  console.log('cool',this.lables);
            let label=[]
            
            this.table_header.forEach(function(){
                // console.log(i)
                label.push(false)
                
            } );
            this.labels=label
            label=[]
        //    console.log('cool2',this.lables);
        }
    },
    computed:{
        operation:function(){
            
            if(this.searchfield){
                // console.log(this.searchfield);
                let search_bar = this.searchfield
                let result = this.nutrition_data.filter((item) => item.name.includes(search_bar))
                // console.log(result);
                return result;
            } else{
                return this.nutritionData
            }
            // return '';
        },
        nutritionData:function(){
            return this.nutrition_data;
        }
    },
    created() {
        // console.log("this.table_header.length()", this.table_header.length);
        this.setLabels();
        // this.labels=[false,false,false,false,false,false]
        // this.lables.push(false);
        // console.log(this.labels)

        // console.log(typeof nutrition_data);
        // console.log(nutrition_data[0]);
        
       
        // this.getData()
        // console.log(headers);
    }
}
</script>

<style scoped>
.heading{
    color:rgb(99, 96, 96);
}
.table-content{
    color:rgb(99, 96, 96);
}
.heading:hover{
    color:black;
    cursor:pointer;
}
.search{
    float: right;
    margin:1.5em 0em;
    border-bottom:.1em solid black;
}
</style>