import Vue from 'vue';
import App from './App.vue';
import 'material-design-icons'
import {MdButton, MdIcon, MdProgress, MdCard, MdList, MdTable, MdTabs, MdContent, MdRipple, MdDialog} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false;

Vue.use(MdTabs);
Vue.use(MdCard);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdProgress);
Vue.use(MdList);
Vue.use(MdTable);
Vue.use(MdContent);
Vue.use(MdRipple);
Vue.use(MdDialog);

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app');

