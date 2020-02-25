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
    <gaodeMap :commit-from="list" @msg="msg"/>
  </div>
</template>
<script>
import gaodeMap from '../components/gaodeMap/map'
export default {
  name: 'Gaode',
  components: {
    gaodeMap
  },
  data() {
    return {
      address: null,
      lat: null,
      lng: null,
      list: {
        Address: '测试定位',
        Longitude: '113.662488',
        Latitude: '34.755371'
      }
      // list: {
      //   Address: null,
      //   Longitude: null,
      //   Latitude: null
      // }
    }
  },

  methods: {
    msg(msg) {
      console.log(msg, 'msg')
      this.address = msg.address
      this.lat = msg.lat
      this.lng = msg.lng
    },
    goZZ() {
      this.list = {
        address: '测试定位',
        Longitude: '113.662488',
        Latitude: '34.755371'
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
