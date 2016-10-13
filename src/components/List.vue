<template>
  <div>
    <div class="card-content">
      共有 {{ count }} 条数据
    </div>
    <div class="card-content paper-list-item" v-for="item in items" v-if="!item.hide" @click="deelteObject(item)">
      <input type="text" v-bind:value="item.get('objectId')" />
      {{ item.get("name") }}
      <span class="float-right"><a>删除</a></span>
      <p><a v-bind:href="item.get('url')" target="_blank">{{ item.get("url") }}</p>
    </div>
  </div>
</template>

<script>
import AV from 'leancloud-storage'

export default {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
