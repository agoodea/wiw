export default [{
        path: '/login/',
        // component: require('./components/panel.vue')
        component: require('./components/user.components/user.component.vue')
    },
    {
        path: '/albums/',
        component: require('./components/album.components/albums.list.vue')
    },
    {
        path: '/',
        meta: {
            requiresAuth: true
        }
        // component: require('./assets/vue/pages/form.vue')
    }
]