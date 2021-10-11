import Router from 'vue-router';


import Calendar from '@/components/Calendar';
import Meetings from '@/components/Meetings';
import search_meetings from '@/components/search_meeting';
import add_meeting from '@/components/add_meeting';
import Teams from '@/components/Teams'
import Login from '@/components/Login'
import SignUp from '@/components/signup'
const router = new Router({
    mode: 'history',
    routes:[
        {
            name: 'SignUp',
            path: '/signup',
            component: SignUp
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

        } 
    ]
})



export default router;