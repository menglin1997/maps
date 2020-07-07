<template>
  <div>
    <div id="map-container" :style="{ height: height,width:width}" class="map_box" />
  </div>

</template>
<script>
// import AMap from 'AMap'
var map, lnglatXY, marker
var t = 1
export default {
  props: {
    height: {
      type: String,
      default: '300px'
    },
    width: {
      type: String,
      default: '100%'
    },
    // 地图的相关配置
    options: {
      type: Object,
      default: function() {
        return {
          // 地图的key
          key: 'd24ccd57302f528796f2780110c9f3da',
          zoom: 5, // 地图显示级别
          setMapStyle: '', // 设置自定义个性化地图---将地图生成的链接写入即可如 amap://styles/4df52953371391eb93a57c81b1e633f3
          draggable: false, // 设置标记点是否可以拖拽
          cursor: 'default', // 设置鼠标放上标记点的效果 用法同css样式cursor
          raiseOnDrag: false // 设置鼠标拖动效果  在draggable为true时生效
        }
      }
    },
    commitFrom: {
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
  mounted() {
    var this_ = this
    var url = 'https://webapi.amap.com/maps?v=1.4.15&key=' + this_.options.key + '&callback=onLoad'
    var jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
    window.onLoad = function() {
      map = new AMap.Map('map-container', {
        resizeEnable: true,
        zoom: this_.options.zoom
      })
      map.setMapStyle(this_.options.setMapStyle)
      if (this_.commitFrom.longitude) {
        this_.addMarker([this_.commitFrom.longitude, this_.commitFrom.latitude], true)
      }
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
      })
      AMap.service('AMap.Geocoder', function() { // 回调函数
        console.log('Geocoder')
      })
      map.on('click', function(e) {
        this_.commitFrom.longitude = e.lnglat.lng
        this_.commitFrom.latitude = e.lnglat.lat
        // 填写地址
        this_.writeAddress([e.lnglat.lng, e.lnglat.lat])
        this_.addMarker([e.lnglat.lng, e.lnglat.lat])
      })
    }
  },
  methods: {
    // 移除之前的标点
    removeMarkers(lnglatXY) {
      marker = new AMap.Marker({
        map: map,
        position: lnglatXY,
        icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        offset: new AMap.Pixel(-13, -30)
      })
      var markers = []
      markers.push(marker)
      map.remove(markers)
    },
    // 实例化点标记
    addMarker(lnglatXY, flag) {
      var thas = this
      if (t === 1 || flag) {
        marker = new AMap.Marker({
          icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: lnglatXY,
          offset: new AMap.Pixel(-13, -30),
          // 设置是否可以拖拽
          draggable: thas.options.draggable,
          cursor: thas.options.cursor,
          // 设置拖拽效果
          raiseOnDrag: thas.options.raiseOnDrag
        })
        marker.setMap(map)
        map.setFitView() // 执行定位
        t++
      } else {
        // 修改标点位置
        // if (t !== 1) {
        marker.setPosition(lnglatXY)
        map.setCenter(lnglatXY)
        marker.setMap(map)
        map.setFitView() // 执行定位
        // }
      }
    },
    // 填写地址
    writeAddress(lnglatXY) {
      var this2 = this
      var geocoder = new AMap.Geocoder({
        city: '重庆', // 城市，默认：“全国”
        radius: 1000 // 范围，默认：500
      })
      geocoder.getAddress(lnglatXY, function(status, result) {
        console.log(status, result, lnglatXY, 'status, result')
        if (status === 'complete' && result.info === 'OK') {
          console.log(status, result, 'status, result')
          this2.$emit('msg', {
            lat: lnglatXY[0],
            lng: lnglatXY[1],
            address: result.regeocode.formattedAddress,
            other: result
          })
        }
      })
    },
    // 根据地址搜索
    markLocation(address) {
      var that = this
      AMap.plugin('AMap.Geocoder', function() {
        var geocoder = new AMap.Geocoder()
        geocoder.getLocation(address, function(status, result) {
          console.log(status, result, '结果')
          if (status === 'complete' && result.info === 'OK') {
            // 经纬度
            var lon = result.geocodes[0].location.lng
            var lat = result.geocodes[0].location.lat
            that.commitFrom.longitude = lon
            that.commitFrom.latitude = lat
            lnglatXY = [lon, lat]
            that.addMarker(lnglatXY)
          } else {
            console.log('定位失败！')
          }
        })
      })
    }

  }
}
</script>

<style>
/* 地图宽度和高度 */
  /* .map_box { width:100%; height:100vh; } */

</style>
