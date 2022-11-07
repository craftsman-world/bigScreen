import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    data: {}
  },
  mutations: {
    // 第一个参数始终是state的值
    SET_DATA: (state, newData) => {
      state.data = newData
    }
  },
  actions: {
    GET_DATA: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get("https://prod.api.craftsman.wpaini.com/admin/sum/public")
          .then(({ data: { data: res } }) => {
            commit("SET_DATA", res)
            console.log(res);
            
            resolve(res)
          }).catch((err) => {
            reject(err)
          })
      })
    }
  },
  modules: {
  },
  getters: {
    data: state => state.data
  }
})
