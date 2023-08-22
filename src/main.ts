import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// handling for this many extra imports should be in separate file
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faPlus,
  faMagnifyingGlass,
  faAnglesRight,
  faAnglesLeft,
  faPenToSquare,
  faTrash,
  faCamera
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faUser,
  faPlus,
  faMagnifyingGlass,
  faAnglesRight,
  faAnglesLeft,
  faPenToSquare,
  faTrash,
  faCamera
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

app.mount('#app')
