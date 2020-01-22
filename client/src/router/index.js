import Vue from 'vue'
import Router from 'vue-router';
import main from '../components/main';
import map from '../components/map';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            component: main
        },
        {
            path: '/view',
            component: map
        }
    ]
});