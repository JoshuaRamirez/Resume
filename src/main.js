import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'
import EditProfile from "./components/EditProfile";
import EditProjects from "./components/EditProjects";
import EditProject from "./components/EditProject";
import EditArchitectures from "./components/EditArchitectures";

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

Vue.use(VueMaterial);
Vue.use(VueRouter);

const routes = [
  { path: "/", component: EditProfile },
  { path: "/projects", component: EditProjects },
  { path: "/project/:id", component: EditProject },
  { path: "/architectures", component: EditArchitectures },
];
const router = new VueRouter({ routes });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
