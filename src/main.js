import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import {Paginate} from 'vuejs-paginate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faUsers,
  faSearch,
  faCog,
  faCogs,
  faTrash
} from '@fortawesome/free-solid-svg-icons';


import VueSweetalert2 from 'vue-sweetalert2';

//Mujer
import FormularioMujer from './components/FormularioMujer.vue';
import FormularioAddMujer from './components/FormularioAddMujer.vue';
import FormularioETMI from './components/FormularioETMI.vue';
import FormularioControlMujer from './components/FormularioControlMujer.vue';
import FormularioAddVacunaMujer from './components/FormularioAddVacunaMujer.vue';

import MiComponente from './components/MiComponente.vue';

//Niños
import FormularioNinos from './components/FormularioNinos.vue';
import FormularioAddNinos from './components/FormularioAddNinos.vue';
import FormularioSaludInfatil from './components/FormularioSaludInfatil.vue';
import FormularioControlNiño from './components/FormularioControlNiño.vue';
import FormularioAddVacuna from './components/FormularioAddVacuna.vue';
import FormularioAddTamizaje from './components/FormularioAddTamizaje.vue';
import FormularioAddAnemia from './components/FormularioAddAnemia.vue';
import GraficoPeso from './components/GraficoPeso.vue';
import GraficoEstatura from './components/GraficoEstatura.vue';
import GraficoICM from './components/GraficoICM.vue';
import GraficoPerimetro from './components/GraficoPerimetro.vue';


//Mujer components
Vue.component('formulario-mujer', FormularioMujer);
Vue.component('formulario-addmujer', FormularioAddMujer);
Vue.component('formulario-etmi', FormularioETMI);
Vue.component('formulario-controlmujer', FormularioControlMujer);
Vue.component('formulario-vacunamujer', FormularioAddVacunaMujer);
//Niños components
Vue.component('formulario-addnino', FormularioAddNinos);
Vue.component('formulario-nino', FormularioNinos);
//Panel por niños id
Vue.component('formulario-salud1', FormularioSaludInfatil);
Vue.component('formulario-salud2', FormularioControlNiño);
Vue.component('formulario-vacuna', FormularioAddVacuna);
Vue.component('formulario-tamizaje', FormularioAddTamizaje);
Vue.component('formulario-anemia', FormularioAddAnemia);
//Graficos para niños
Vue.component('grafico-peso', GraficoPeso);
Vue.component('grafico-longitud', GraficoEstatura);
Vue.component('grafico-icm', GraficoICM);
Vue.component('grafico-perimetro', GraficoPerimetro);

Vue.component('mi-componente', MiComponente);


Vue.component('paginate', Paginate)




library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt,faUsers, faSearch, faCog , faCogs, faTrash);

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(VueSweetalert2);

Vue.component('font-awesome-icon', FontAwesomeIcon);





Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
