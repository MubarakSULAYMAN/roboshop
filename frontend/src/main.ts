import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/base.css';

createApp(App)
  // .use(dayjs)
  .use(store)
  .use(router)
  .mount('#app');
