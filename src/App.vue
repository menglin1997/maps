<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import { GetOpenId, GetSignature } from '../static/common'
// import wx from 'weixin-js-sdk'

export default {
  name: 'App',
  created() {
    window.localStorage.clear()
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('messageStore', JSON.stringify(this.$store.state))
    })
    // 在页面加载时读取sessionStorage里的状态信息
    sessionStorage.getItem('messageStore') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(sessionStorage.getItem('messageStore'))))
  }

}
</script>

<style>
body {
  font-weight: 400;
  font-family: PingFang-SC-Regular;
  background-color: #f7f7f7;
}
.weui-toast {
  /* bottom: 2.4rem; */
  top: calc(100vh - 5rem);
}
.vue-loading {
  margin: auto;
  position: fixed;
  top: 40%;
  left: calc((100% - 1.5rem) / 2);
}
.weui-cells {
  background: #f7f7f7 !important;
  margin-top: 0 !important;
}
</style>
