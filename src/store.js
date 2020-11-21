import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    coins: [],
    message:""
  },
  actions: {
    getCoinsAction: (context, payload)=>{
      return new Promise(async (resolve, reject) => {
        axios({
          url: 'https://api.coinranking.com/v1/public/coins/?limit=100',
          method: "GET"
        })
          .then(resp => {
            console.log('resp --> ', resp)
            context.commit("fetch_coin_success", resp.data);
            resolve(resp.data);
          })
          .catch(err => {
            context.commit("fetch_coin_error", "Error");
            reject(err);
          });
      })
    }
  },
  mutations: {
    fetch_coin_success(state, coinsObj) {
      state.coins = coinsObj;
    },
    fetch_coin_error(state, msg) {
      state.message = msg;
    }
  },
  getters: {},
});