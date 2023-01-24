import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/vuexs.js'
import numeral from 'numeral'
const app = createApp(App)
app.use(router)
app.use(store)
app.use("formatNumber", function (value) {
  return numeral(value).format("0,0");
});
app.mount('#app')