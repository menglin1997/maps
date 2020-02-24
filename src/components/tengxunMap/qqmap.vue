<template>
  <div class="padd20">
    <mapselect :mapcenter="centerLatLng" :oldmarker="oldMarker" @mapclick="pointChange" />
  </div>

</template>

<script type="text/ecmascript-6">
import mapselect from './selectPoint'
// let qqMapSelectPoint = require('./selectPoint.vue');
export default {
  components: {
    mapselect
  },
  props: {
    list: {
      type: Object,
      default: function() {
        return {
          address: null,
          longitude: null,
          latitude: null
        }
      }
    }
  },
  data: function() {
    return {
      pointName: '郑州',
      qqmap: null,
      centerLatLng: '34.759666,113.648071',
      oldMarker: '34.759666,113.648071',
      newMarker: null
    }
  },
  watch: {
    list(val, a) {
      console.log(val, a, 'asdfasdf')
      this.centerLatLng = '' + val.latitude + ',' + val.longitude
      this.oldMarker = '' + val.latitude + ',' + val.longitude
      console.log(this.oldMarker, 'oold')
    }
  },
  created() {
    this.centerLatLng = this.list.latitude > 0 ? '' + this.list.latitude + ',' + this.list.longitude : '34.759666,113.648071'
    this.oldMarker = this.list.latitude > 0 ? '' + this.list.latitude + ',' + this.list.longitude : '34.759666,113.648071'
    console.log(this.list, '34.759666,113.648071')
  },
  methods: {
    // mapMsg
    pointChange(ev) {
      console.log('捕获到点击坐标', ev)
      if (ev) {
        this.$emit('msg', ev)
      }
      window.addEventListener('message', function(event) {
        console.log(event, 'event')
        // 接收位置信息
        var loc = event.data
        console.log('location', loc)
      }, false)
    }
  }
}
</script>

<style>
    .qqmap { width: 100%;
        height: 600px;
    }
</style>
