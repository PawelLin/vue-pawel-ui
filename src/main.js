import Vue from 'vue'
import App from './App.vue'
import UI from 'vue-pawel-ui'
// import UI from '../packages'
// import './themes.scss'

Vue.config.productionTip = false

Vue.use(UI)

new Vue({
    render: h => h(App)
}).$mount('#app')
