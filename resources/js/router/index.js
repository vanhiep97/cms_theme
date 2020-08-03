import Vue from 'vue'
import Router from 'vue-router'

function page(path) {
    return () => import(`../pages/${path}`).then((m) => m.default || m);
  }

Vue.use(Router)

const routes = new Router({
    mode: 'history',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/login',
            meta: {
                layout: 'GuestLayout'
            },
            component: page('Login.vue')
        },
        {
            path: '/',
            meta: {
                layout: 'MainLayout'
            },
            component: page('Home.vue'),
            children: [

            ]
        }
    ]
})

export default routes;