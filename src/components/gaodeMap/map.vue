<template>
  <div>
    <div id="map-container" class="map_box"/>
  </div>

</template>
<script>
// import AMap from 'AMap'

var map, lnglatXY, marker
var t = 1
export default {
  props: {
    commitFrom: {
      type: Object,
      default: function() {
        return {
          Address: null,
          Longitude: null,
          Latitude: null
        }
      }
    }
  },
  watch: {
    commitFrom(val) {
      console.log(val, 'val')
      if (val.Longitude) {
        lnglatXY = [val.Longitude, val.Latitude]
        if (t === 1) {
        // console.log(lnglatXY)
          marker = new AMap.Marker({
            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: lnglatXY,
            offset: new AMap.Pixel(-13, -30),
            // 设置是否可以拖拽
            draggable: true,
            cursor: 'move',
            // 设置拖拽效果
            raiseOnDrag: true
          })
          marker.setMap(map)
          map.setFitView() // 执行定位
          t++
        }
        // 修改标点位置
        if (t !== 1) {
          marker.setPosition(lnglatXY)
          map.setCenter(lnglatXY)
          marker.setMap(map)
          map.setFitView() // 执行定位
        }
      }
    }
  },
  mounted() {
    var this_ = this
    var url = 'https://webapi.amap.com/maps?v=1.4.15&key=你的key值&callback=onLoad'
    var jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
    window.onLoad = function() {
      map = new AMap.Map('map-container', {
        resizeEnable: true,
        zoom: 15
      })
      console.log('加载出来了')
      if (this_.commitFrom.Longitude) {
        console.log(this_.commitFrom, '编辑栏')
        this_.myMapViewLocation(this_.commitFrom.Longitude, this_.commitFrom.Latitude)
      }
      console.log(this_.commitFrom, '编辑栏')

      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
        console.log(1)
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
      })
      AMap.service('AMap.Geocoder', function() { // 回调函数
        console.log('Geocoder')
      })
      // 加载搜索列表
      this_.myMapViewLocation()
      map.on('click', function(e) {
        this_.commitFrom.Longitude = e.lnglat.lng
        this_.commitFrom.Latitude = e.lnglat.lat
        console.log(e, 'e')
        // 填写地址
        this_.writeAddress([e.lnglat.lng, e.lnglat.lat])
        this_.mapsearch()
        this_.addMarker([e.lnglat.lng, e.lnglat.lat])
      })
    }
  },
  methods: {

    // 地图搜索
    mapsearch() {
      this.myMapViewLocation(this.commitFrom.Longitude, this.commitFrom.Latitude)
    },
    // 回显
    myMapViewLocation(mlon, mlat) {
      var this1 = this
      if (mlon && mlat) {
        lnglatXY = [mlon, mlat]
        this1.addMarker(lnglatXY)
      }
    },
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
    addMarker(lnglatXY) {
      if (t === 1) {
        // console.log(lnglatXY)
        marker = new AMap.Marker({
          icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: lnglatXY,
          offset: new AMap.Pixel(-13, -30),
          // 设置是否可以拖拽
          draggable: true,
          cursor: 'move',
          // 设置拖拽效果
          raiseOnDrag: true
        })
        marker.setMap(map)
        map.setFitView() // 执行定位
        t++
      }
      // 修改标点位置
      if (t !== 1) {
        marker.setPosition(lnglatXY)
        map.setCenter(lnglatXY)
        marker.setMap(map)
        map.setFitView() // 执行定位
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
          // var add = result.regeocode.formattedAddress
          // var arr = add.split('省')
          // if (arr.length > 1) {
          //   arr = arr[1]
          // } else {
          //   console.log('我不是直接的省')
          //   arr = add.split('自治区')
          //   // console.log(arr)
          //   if (arr.length > 1) {
          //     arr = arr[1]
          //   } else {
          //     arr = arr[0]
          //   }
          // }
          // console.log(arr)
          // this2.commitFrom.Address = arr
        }
      })
    },
    // 地址回调
    geocoder_CallBack(data) {
      // var address = data.city + data.district + data.street + data.streetNumber + data.township //返回地址描述
      var address = data // 返回地址描述
      this.commitFrom.Address = address
    },
    // 根据地址搜索
    markLocation() {
      var that = this
      var address = that.commitFrom.Address
      AMap.plugin('AMap.Geocoder', function() {
        var geocoder = new AMap.Geocoder()
        geocoder.getLocation(address, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 经纬度
            var lon = result.geocodes[0].location.lng
            var lat = result.geocodes[0].location.lat
            that.commitFrom.Longitude = lon
            that.commitFrom.Latitude = lat
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
  .map_box { width:100%; height:600px; }

</style>
