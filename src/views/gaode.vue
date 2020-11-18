<!--
 * @Descripttion:
 * @version:
 * @Author: zml
 * @Date: 2020-07-07 11:24:26
 * @LastEditors: zml
 * @LastEditTime: 2020-11-17 15:34:02
-->
<template>
  <div>
    <div>
      
      <!-- <h1 style="text-align:center" @click="goZZ">点我定位到郑州市</h1> -->
      <h1 style="text-align:center">高德地图</h1>
    </div>

    <div>
      <h1>点击地图</h1>

      <div>
        您点击的地址为:{{ address }}

      </div>
      <div>
        lat精度: {{ lat }}<br >
        <input v-model.number="list.longitude" type="text" @blur="handleChange">
        lng纬度: {{ lng }}
        <input v-model.number="list.latitude" type="text" @blur="handleChange">
        地址查询<input v-model="list.address" type="text" @blur="changeAddress">
      </div>
    </div>
    <gaodeMap ref="gaode" :commit-from="list" @msg="msg" mulMarks/>
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
      gaodeShow: false,
      address: null,
      lat: null,
      lng: null,
      list: {
        address: '测试定位',
        longitude: '113.662488',
        latitude: '34.755371'
      }
    }
  },

  methods: {
    msg(msg) {
      console.log(msg, 'msg')
      this.address = msg.address
      this.lat = msg.lat
      this.lng = msg.lng
    },
    // 输入框内容改变
    handleChange() {
      console.log(this.list, 'list')
      if (this.list.longitude && this.list.latitude) {
        this.$refs.gaode.addMarker([this.list.longitude, this.list.latitude], false)
        this.$refs.gaode.writeAddress([this.list.longitude, this.list.latitude])
      }
    },
    // 地址输入框内容改变
    changeAddress() {
      if (this.list.address) {
        this.$refs.gaode.markLocation(this.list.address)
      }
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
