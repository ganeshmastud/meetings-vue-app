import Router from 'vue-router';

import {store} from '@/stores';
import Calendar from '@/components/Calendar';
import Meetings from '@/components/Meetings';
import search_meetings from '@/components/search_meeting';
import add_meeting from '@/components/add_meeting';
import Teams from '@/components/Teams'
import Login from '@/components/Login'
import Signup from '@/components/signup'
import PageNotFound  from '@/components/pageNotFound'
const router = new Router({
    mode: 'history',
    routes:[
        {
            name: 'AppSignUp',
            path: '/signup',
            component: Signup
        },
        {
            name: 'AppLogin',
            path: '/login',
            component: Login
        },
        {
            name:'Calendar',
            path:'/',
            component: Calendar
        },
        {
            name:'Teams',
            path:'/teams',
            component:Teams
        },
        {
            name:'Meetings',
            path:'/meetings',
            component: Meetings,
            children:[
                {
                    name:'Search_Meetings',
                    path:'/search_meetings',
                    component:search_meetings
                }, 
                {
                    name:'Add_Meeting',
                    path:'/add_meeting',
                    component:add_meeting
                }
               

            ]

        },
         {   
            name:'PageNotFound',
            path: "*",
            component: PageNotFound 
         }
    ]
})

let flag=true
router.beforeEach(( to, from, next ) => {
    console.log(from.name," from page to :",to.name);
     
      if( flag === true && to.name !== 'AppSignUp' && to.name !== 'AppLogin'  && !store.getters.isAuthenticated ) {  //checks for the name of the router rather than path to the router *
        console.log("In APP login");
        flag = false;
        return next({ 
            name: 'AppLogin'
        });
    } else if( !flag && to.name === 'AppSignUp' ){
        flag=true;
        return next('/signup');
        
    }

    next();
});

export default router;