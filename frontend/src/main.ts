import { createApp } from 'vue'
import './assets/css/main.css'
import './assets/css/tailwind.css'
import App from './App.vue'

import router from './router'; // Import the router configuration

const app = createApp(App);

app.use(router); // Use the router

app.mount('#app');
