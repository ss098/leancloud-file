<template>
  <div>
    <div class="card-content">
      <upload></upload>
      <p>共有 {{ count }} 条数据</p>
    </div>
    <div class="card-content paper-list-item" v-for="item in items" v-if="!item.hide">
      <input type="text" v-bind:value="item.get('objectId')" />
      {{ formatFileSize(item.get('metaData').size) }}
      <p>{{ item.get("name") }}</p>
      <span class="float-right"><a @click="deelteObject(item)">删除</a></span>
      <p><a v-bind:href="item.get('url')" target="_blank">{{ item.get("url") }}</p>
    </div>
  </div>
</template>

<script>
import Upload from './Upload.vue'
import store from '../store.js'

export default {
  components: {
    Upload
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    count () {
      return store.state.count
    },
    items () {
      return store.state.items
    }
  },
  created: function () {
    this.getList()
  },
  methods: {
    getCount () {
      store.commit('getCount')
    },
    getList () {
      this.getCount()
      store.commit('getList')
    },
    deelteObject (object) {
      object.hide = true
      object.destroy().then((data) => {
        // success
        this.getList()
      }, (data) => {
        // error
      })
    },
    formatFileSize (fileSize, idx = 0) {
      const units = ['Byte', 'KByte', 'MByte', 'GByte']
      if (fileSize < 1024 || idx === units.length - 1) {
        return fileSize.toFixed(1) + units[idx]
      }
      return this.formatFileSize(fileSize / 1024, ++idx)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
