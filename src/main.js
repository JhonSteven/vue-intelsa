import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/** BOOTSTRAP  */
import BootstrapVue from "bootstrap-vue"
Vue.use(BootstrapVue)
import "./assets/styles/custom.scss"
/** END BOOTSTRAP  */

import './config/sweetalert2';
import './config/api';
import './config/vee-validate';
import './config/fontawesome';

Vue.config.productionTip = false

import globalTypes from './store/types/global';
import authTypes from './store/types/auth';

new Vue({
    router,
    store,
    render: h => h(App),
    async beforeCreate() {
        if (window.localStorage.getItem('access_token')) {
            store.commit(globalTypes.mutations.SET_LOADED, false)
            await store.dispatch(authTypes.actions.me).catch(error => router.push({ name: 'Login' }))
        }
        store.commit(globalTypes.mutations.SET_LOADED, true)
    }
}).$mount('#app')