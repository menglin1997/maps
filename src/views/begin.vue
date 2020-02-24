<template>
  <div>
    <div @click="toMap('/baidu')">
      百度地图

    </div>
    <div @click="toMap('/tengxun')">
      腾讯地图

    </div>
    <div @click="toMap('/gaode')">
      高德地图
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
