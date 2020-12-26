import Vue from 'vue'
import Vuex from 'vuex'
import gui from './gui'
import router from './router'
import releases from '@/assets/releases.yml';
import VueMarkdown from 'vue-markdown';

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.component('vue-markdown', VueMarkdown);

const store = new Vuex.Store({
    state: {
        ...releases,
        current_track: 0,
    }, 
    mutations: {
        set_track: function(state, track_id) {
            state.current_track = track_id;
        },
    },
});

new Vue({
  el: '#gui',
  router,
  store,
  template: '<gui/>',
  components: { gui }
})
