<template>
  <input type="file" class="button" @change="uploadFile">
</template>

<script>
import AV from 'leancloud-storage'
import store from '../store.js'

export default {
  data () {
    return {
      //
    }
  },
  created: function () {
    //
  },
  methods: {
    uploadFile (event) {
      if (!event.target.value) {
        return
      }
      let file = new AV.File(event.target.value, event.target.files[0])
      file.save().then((file) => {
        store.commit('getList')
        store.commit('getCount')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
