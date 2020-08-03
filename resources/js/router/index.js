import Vue from 'vue'
import Router from 'vue-router'

function page(path) {
    return () => import(`../pages/${path}`).then((m) => m.default || m);
}

function view(path) {
    return () => import(`../views/${path}`).then((m) => m.default || m);
}

Vue.use(Router)

export default new Router({
    mode: 'history',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/login',
            name: 'Login',
            meta: {
                layout: 'GuestLayout'
            },
            component: page('Login.vue')
        },
        {
            path: '/',
            name: 'Home',
            meta: {
                layout: 'MainLayout'
            },
            component: page('Home.vue'),
            children: [
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    meta: {
                        layout: 'MainLayout'
                    },
                    component: view('Dashboard.vue')
                },
                {
                    path: '/users',
                    name: 'Users',
                    meta: {
                        layout: 'MainLayout'
                    },
                    component: view('users/Users.vue')
                },
                {
                    path: '/users-trashed',
                    name: 'UsersTrash',
                    meta: {
                        layout: 'MainLayout'
                    },
                    component: view('users/UsersTrash.vue')
                },
                {
                    path: '/user',
                    name: 'User',
                    meta: {
                        layout: 'MainLayout'
                    },
                    component: view('users/User.vue')
                },
            ]
        }
    ]
})

