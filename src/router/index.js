import Vue from 'vue'
import Router from 'vue-router'
import ReleaseList from '@/components/release-list'
import Release from '@/components/release'

Vue.use(Router)

export default new Router({
    mode: 'history', 
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'index',
            component: ReleaseList 
        }, 
        {
            path: '/release/:cat_id', 
            name: 'release', 
            component: Release
        }
    ]
})
