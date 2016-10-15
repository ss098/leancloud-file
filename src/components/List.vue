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
import AV from 'leancloud-storage'
import Upload from './Upload.vue'

export default {
  components: {
    Upload
  },
  data () {
    return {
      items: [],
      count: 0,
      page: 1,
      limit: 20
    }
  },
  created: function () {
    this.getCount()
    this.getList()
  },
  methods: {
    getCount () {
      var query = new AV.Query('_File')
      query.count(this).then((count) => {
        this.count = count
      })
    },
    getList () {
      var query = new AV.Query('_File')
      query.descending('createdAt')
      query.find().then((data) => {
        // data 就是符合条件的第一个 AV.Object
        this.items = data
        window.test = data
      })
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
