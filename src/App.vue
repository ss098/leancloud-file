<template>
  <div id="app">
    <div class="card">
      <div class="card-header">LeanCloud File</div>
      <div class="card-sidebar">
        LeanCloud 文件控制台
      </div>
      <div v-if="APP_INPUTBOX" class="card-content">
        <p>在这里填写您的 APP ID 与 APP KEY，点击确定后可保存。</p>
        <p>
          <input type="text" id="APP_ID" placeholder="APP_ID" v-model.trim="APP_ID" />
        </p>
        <p>
          <input type="text" id="APP_KEY" placeholder="APP_KEY" v-model.trim="APP_KEY" /> <input type="button" value="确定" @click="setApp" />
        </p>
      </div>
      <list v-else></list>
      <div class="card-footer">
        &copy; 2016 LeanCloud File 是一个对 LeanCloud 提供的 _File 表进行操作的面板
      </div>
    </div>
  </div>
</template>

<script>
import List from './components/List'
import AV from 'leancloud-storage'

export default {
  components: {
    List
  },
  data () {
    return {
      // 显示不显示输入框
      APP_INPUTBOX: true,
      APP_ID: window.localStorage.APP_ID,
      APP_KEY: window.localStorage.APP_KEY
    }
  },
  methods: {
    /**
     * 设置 App ID 与 App KEY
     */
    setApp () {
      AV.init({
        appId: this.APP_ID,
        appKey: this.APP_KEY
      })
      this.APP_INPUTBOX = !this.APP_INPUTBOX

      window.localStorage.APP_ID = this.APP_ID
      window.localStorage.APP_KEY = this.APP_KEY
    }
  }
}
</script>

<style>
  /* Base CSS */
  body {
    margin: 0;
    word-wrap: break-word;
    overflow-y: scroll;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-rendering: optimizelegibility;
  }

  body, button, textarea, input, code {
    font-family: Lucida Console, Bookman Old Style, 'Ubuntu', Georgia, "Times New Roman", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  a:link {
    color: #3354AA;
  }

  a:visited {
    color: #3354AA;
  }

  a:hover {
    text-decoration: underline;
  }

  .float-right {
    float: right;
  }

  /* Card Widget */
  .card {
    border-radius: 2px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.4rem;
    margin-bottom: 1rem;
    width: 50%;
    max-width: 1024px;
  }

  .card-sidebar {
    background-image: url("https://www.qiyichao.cn/static/image/background.jpg");
    color: white;
    padding: 2rem 1rem;
    border-top: 1px solid rgba(160, 160, 160, 0.2);
    border-bottom: 1px solid rgba(160, 160, 160, 0.2);
    text-align: center;
  }

  .card-sidebar a[href] {
    color: white;
  }

  .card-header {
    padding: 0.5rem 1rem;
    overflow: hidden;
  }

  .card-content {
    padding: 1rem;
    border-top: 1px solid rgba(160, 160, 160, 0.2);
    border-bottom: 1px solid rgba(160, 160, 160, 0.2);
  }

  .card .card-footer {
    padding: 1rem;
    overflow: hidden;
    font-family: Lucida Console, Bookman Old Style, 'Ubuntu', Georgia, "Times New Roman", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  @media (max-width: 1024px) {
    .card {
      width: 98%;
    }
  }

  /* Input Widget */
  input[type="text"], input[type="password"], input[type="email"], input[type="number"], input[type="button"], input[type="file"] .button {
    padding: 0.5em;
    font-size: 1rem;
    line-height: 1.2;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 0;
    -webkit-appearance: none;
  }

  input[type="button"], .button {
    cursor: pointer;
    text-align: center;
  }

  .paper-list-item a {
    text-decoration: none;
  }

  .paper-list-item {
    transition: border-left 200ms;
  }

  .paper-list-item:hover {
    border-left: #35B8CD 0.4rem solid;
  }
</style>
