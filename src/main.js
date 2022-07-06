import { createApp } from 'vue'
import App from './App.vue'
import './assets/icons/icons.css'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

createApp(App).use(VueTippy).mount('#app')
