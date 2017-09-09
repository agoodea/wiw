export default [{
        path: '/login/',
        // component: require('./components/panel.vue')
        component: require('./components/user.component.vue')
    },
    {
        path: '/albums/',
        component: require('./components/albums.list.vue')
    },
    {
        path: '/',
        meta: {
            requiresAuth: true
        }
        // component: require('./assets/vue/pages/form.vue')
    }
    // ,
    // {
    //   path: '/dynamic-route/blog/:blogId/post/:postId/',
    //   component: require('./assets/vue/pages/dynamic-route.vue')
    // }
]