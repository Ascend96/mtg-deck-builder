import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import {firestorePlugin} from 'vuefire';
import {BootstrapVue} from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/app.scss';

import CardSearchPage from "@/components/CardSearchPage";
import DecksPage from "@/components/DecksPage";
import PackOpeningPage from "@/components/PackOpeningPage";
import Home from "@/components/Home";
import Deckpage from "@/components/Deckpage";

Vue.use(VueRouter)
Vue.use(firestorePlugin)
Vue.use(BootstrapVue)

const routes = [
  {path: '/', component: Home },
  {path: '/cardsearch', component: CardSearchPage},
  {path: '/decks', component: DecksPage},
  {path: '/packopening', component: PackOpeningPage},
  {name: 'deck', path: '/deck/:id', component: Deckpage, props: true}
]

const router = new VueRouter({
  routes
})
Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
