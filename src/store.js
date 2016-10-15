import Vue from 'vue'
import Vuex from 'vuex'
import AV from 'leancloud-storage'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    items: []
  },
  mutations: {
    getCount (state) {
      var query = new AV.Query('_File')
      query.count(this).then((count) => {
        state.count = count
      })
    },
    getList (state) {
      let query = new AV.Query('_File')
      query.descending('createdAt')
      query.find().then((data) => {
        state.items = data
      })
    }
  }
})

export default store
