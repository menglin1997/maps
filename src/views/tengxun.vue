<template>
  <div>
    <div>
      <h1 style="text-align:center" @click="goZZ">点我定位到郑州市</h1>
    </div>
    <div>
      <h1>点击地图</h1>
      <div>
        您点击的地址为:{{ address }}

      </div>
      <div>
        lat: {{ lat }}<br >
        lng: {{ lng }}
      </div>
    </div>
    <qqMap :list="list" @msg="msg"/>
  </div>
</template>
<script>
import qqMap from '../components/tengxunMap/qqmap'
export default {
  name: 'Tengxun',
  components: {
    qqMap
  },
  data() {
    return {
      address: null,
      lat: null,
      lng: null,
      list: {
        address: '测试定位',
        longitude: '113.662488',
        latitude: '34.755371'
      }
      // list: {
      //   address: null,
      //   longitude: null,
      //   latitude: null
      // }
    }
  },
  methods: {
    msg(msg) {
      console.log(msg, 'msg')
      if (msg.detail) {
        this.address = msg.detail.address
        this.lat = msg.detail.location.lat
        this.lng = msg.detail.location.lng
      }
    },
    goZZ() {
      this.list = {
        address: '测试定位',
        longitude: '113.662488',
        latitude: '34.755371'
      }
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
