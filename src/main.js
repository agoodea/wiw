// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

const $$ = Dom7;

// import firebase from 'firebase';
// import * as firebase from "firebase";

// Import F7 iOS Theme Styles
/* import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'*/
/* OR for Material Theme:*/
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'


// Import App Custom Styles
import AppStyles from './assets/sass/main.scss'
import AppStyles from './assets/css/framework7-icons.css'
// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './main.vue'

// Init F7 Vue Plugin
Vue.use(Framework7Vue)

var config = {
    apiKey: "AIzaSyCbKzLmzVh-HRZuItsYYBHyMWvIOna_Dn0",
    authDomain: "who-is-who-80223.firebaseapp.com",
    databaseURL: "https://who-is-who-80223.firebaseio.com",
    projectId: "who-is-who-80223",
    storageBucket: "who-is-who-80223.appspot.com",
    messagingSenderId: "443249798545"
};

let mixins = {}
    // mixins.loadRoutes = {
    //         data: {
    //             loginRoutes: []
    //         },
    //         methods: {
    //             urlRequiresLogin: function(url) {
    //                 let loginRequired = false
    //                 this.loginRoutes.map(route => {
    //                     let regexp = new RegExp('^' + route.replace(/\/:[a-zA-Z0-9-_]+\//g, '\/[a-zA-Z0-9-]+\/') + '$') // eslint-disable-line
    //                     url = url.match(/([0-9a-zA-Z-/]+)/)[1]
    //                     if (url.substr(0, 1) !== '/') url = '/' + url
    //                     if (url.substr(url.length - 1) !== '/') url = url + '/'
    //                     if (regexp.test(url)) loginRequired = true
    //                 })
    //                 return loginRequired
    //             }
    //         },
    //         created: function() {
    //             // Load routes file
    //             let routes = require("./routes.js").default;
    //             // for (let r = 0; r < routes.length; r++) {
    //             //     // Page routes
    //             //     // try {
    //             //     //     routes[r].component = require(process.env.APP_ROOT_FROM_SCRIPTS + 'pages/' + routes[r].component)
    //             //     // } catch (err) {
    //             //     //     console.error('Failed to load page component "' + routes[r].component + '". Please update the routes.json file.')
    //             //     // }
    //             //     // Login required?
    //             //     // if (routes[r].login === true) this.loginRoutes.push(routes[r].path)
    //             //         // Tab routes
    //             //     // if (Array.isArray(routes[r].tabs)) {
    //             //     //     for (let t = 0; t < routes[r].tabs.length; t++) {
    //             //     //         try {
    //             //     //             routes[r].tabs[t].component = require(process.env.APP_ROOT_FROM_SCRIPTS + 'pages/' + routes[r].tabs[t].component)
    //             //     //         } catch (err) {
    //             //     //             console.error('Failed to load page component "' + routes[r].tabs[t].component + '". Please update the routes.json file.')
    //             //     //         }
    //             //     //         // Login required?
    //             //     //         if (routes[r].tabs[t].login === true) {
    //             //     //             this.loginRoutes.push(routes[r].path + routes[r].tabs[t].path.substr(1))
    //             //     //         }
    //             //     //         // Alternate tab routes
    //             //     //         if (Array.isArray(routes[r].tabs[t].routes)) {
    //             //     //             for (let a = 0; a < routes[r].tabs[t].routes.length; a++) {
    //             //     //                 try {
    //             //     //                     routes[r].tabs[t].routes[a].component = require(process.env.APP_ROOT_FROM_SCRIPTS + 'pages/' + routes[r].tabs[t].routes[a].component)
    //             //     //                 } catch (err) {
    //             //     //                     console.error('Failed to load page component "' + routes[r].tabs[t].routes[a].component + '". Please update the routes.json file.')
    //             //     //                 }
    //             //     //                 // Login required?
    //             //     //                 if (routes[r].tabs[t].routes[a].login === true) {
    //             //     //                     this.loginRoutes.push(routes[r].path + routes[r].tabs[t].path.substr(1) + routes[r].tabs[t].routes[a].path.substr(1))
    //             //     //                 }
    //             //     //             }
    //             //     //         }
    //             //     //     }
    //             //     }
    //             // }
    //             // Add login screen route
    //             routes.push({
    //                 path: '/login/',
    //                 component: require('./components/login.component.vue')
    //             });
    //             this.loginRoutes.push({
    //                 path: '/login/',
    //                 component: require('./components/login.component.vue')
    //             });
    //             // Add routes to Framework7 initialization object
    //             this.$options.framework7.routes = routes
    //                 // Add preroute function for login-requiring pages to Framework7
    //             if (this.loginRoutes.length > 0) {
    //                 this.$options.framework7.preroute = (view, options) => {
    //                     if (this.user !== null || options.isBack === true || options.url === undefined) {
    //                         return true
    //                     } else {
    //                         if (this.urlRequiresLogin(options.url)) {
    //                             window.localStorage.requestedView = view.selector
    //                             window.localStorage.requestedUrl = options.url
    //                             view.router.load({ url: '/login/' })
    //                             return false
    //                         } else {
    //                             return true
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     },
mixins.manageGlobalDataObject = {
        // Set initial data
        data: {
            data: {}
        },
        // Methods to add or remove data
        methods: {
            saveData: function(path, value) {
                // Clone current data
                let data = JSON.parse(JSON.stringify(this.data))
                    // Add value to path
                data = set(data, path, value)
                    // Update root data object
                this.$set(this, 'data', data)
                    // Update local storage
                window.localStorage.data = JSON.stringify(this.data)
            },
            removeData: function(path) {
                // Clone current data
                let data = JSON.parse(JSON.stringify(this.data))
                    // Remove path
                unset(data, path)
                    // Update root data object
                this.$set(this, 'data', data)
                    // Update local storage
                window.localStorage.data = JSON.stringify(this.data)
            }
        },
        // Restore local storage
        created: function() {
            this.data = window.localStorage.data !== undefined ? JSON.parse(window.localStorage.data) : {}
        }
    },
    mixins.manageFirebase = {
        // Set initial values
        data: {
            user: null,
            db: null,
            store: null,
            timestamp: null
        },
        // Init Firebase
        created: function() {
            // Use Firebase

            // Include scripts
            // let firebase = require('firebase/app')
            // if (process.env.USE_FIREBASE_AUTH === 'true') require('firebase/auth')
            // if (process.env.USE_FIREBASE_DATABASE === 'true') require('firebase/database')
            // if (process.env.USE_FIREBASE_STORAGE === 'true') require('firebase/storage')
            // Initialize Firebase
            window.firebase = firebase.initializeApp(config);
            // Use auth service

            // Get initial user data from local storage
            this.user = window.localStorage.user ? JSON.parse(window.localStorage.user) : null
                // Clean local storage if user is not logged in initially
            if (!window.localStorage.user) this.cleanLocalStorageAfterLogut()
                // Monitor user changes
            firebase.auth().onAuthStateChanged(user => {
                this.user = user ? {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    photo: user.photoURL
                } : null
            })

            // Use database service
            this.db = function(path) {
                    return firebase.database().ref(path)
                }
                // this.timestamp = firebase.database.ServerValue.TIMESTAMP

            // Use storage service
            this.store = function(path) {
                return firebase.storage().ref(path)
            }


        },
        // Watch for changes
        watch: {
            user: function(newUser) {
                // Update local storage
                if (newUser === null) {
                    window.localStorage.removeItem('user')
                    this.cleanLocalStorageAfterLogut()
                } else {
                    window.localStorage.user = JSON.stringify(newUser)
                }
                // Update window object
                window.user = newUser
            },
            db: function(newDB) {
                // Update window object
                window.db = newDB
            },
            store: function(newStore) {
                // Update window object
                window.store = newStore
            },
            timestamp: function(newTimestamp) {
                // Update window object
                window.timestamp = newTimestamp
            }
        },
        methods: {
            cleanLocalStorageAfterLogut: function() {
                for (let item in window.localStorage) {
                    // History
                    if (/^urls\|([0-9a-zA-Z._-]+)$/.test(item)) {
                        let urls = JSON.parse(window.localStorage[item])
                        let newUrls = []
                        let loginRequired = false
                        urls.map((url) => {
                            if (this.urlRequiresLogin(url)) {
                                loginRequired = true
                            } else if (!loginRequired) {
                                newUrls.push(url)
                            }
                        })
                        window.localStorage[item] = JSON.stringify(newUrls)
                            // Component data and scroll positions
                    } else if (/(scroll|data)\|[0-9a-zA-Z._-]+\|(.+)$/.test(item)) {
                        let url = item.match(/(scroll|data)\|[0-9a-zA-Z._-]+\|(.+)$/)[2]
                        if (this.urlRequiresLogin(url)) {
                            window.localStorage.removeItem(item)
                        }
                    }
                }
            }
        }
    }

let useMixins = Object.keys(mixins).map(mixin => mixins[mixin])

var bus = new Vue();

import VueLogger from 'vuejs-logger'

const options = {
    logLevel: 'debug',
    // optional : defaults to false if not specified 
    stringifyArguments: false,
    // optional : defaults to false if not specified 
    showLogLevel: false
}

Vue.use(VueLogger, options);
// Vue.use(firebase);

import authService from './services/auth.service.js'
// Init App
let vm = new Vue({
    el: '#app',
    template: '<app/>',
    created() {
        alert('created mainjs');
        this.$log.info('test');
    },
    // data: data,
    mixins: useMixins,
    // Init Framework7 by passing parameters here
    framework7: {
        root: '#app',
        /* Uncomment to enable Material theme: */
        // material: true,
        routes: Routes
    },
    // Register App Component
    components: {
        app: App
    }
})