<template>
  <div>
    <div class="clic" @click="toMap('/baidu')">
      <h1>百度地图（点我）</h1>

    </div>
    <div class="clic" @click="toMap('/tengxun')">
      <h1> 腾讯地图(点我)</h1>

    </div>
    <div class="clic" @click="toMap('/gaode')">
      <h1>高德地图（点我）</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Begin',
  methods: {
    toMap(val) {
      console.log(this.$router, 'route')
      this.$router.push(val)
    }
  }

}
</script>
<style lang="less" scoped>
@import "./../base";

.clic {
  cursor: pointer;
  text-align: center;
}
.boxs {
  padding: 30px 40px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  p {
    color: @thems_texttwo;
    text-align: center;
    font-size: 36px;
  }

  .jc_btns {
    margin-top: 350px;
    background: #4486f5;
  }
}
</style>
