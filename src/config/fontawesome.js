import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faListAlt, faPlus, faSearch, faSpinner, faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faListAlt, faPlus, faSearch, faSpinner, faEdit, faTrash, faTimes)

Vue.component('fa-icon', FontAwesomeIcon)