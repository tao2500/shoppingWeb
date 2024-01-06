import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';

document.title = '康无忧 | 您身边的好药房';
const app = createApp(App).use(ElementPlus).use(router)
app.mount('#app');
