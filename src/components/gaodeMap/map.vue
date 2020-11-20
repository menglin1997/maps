<template>
  <div>
    <el-button @click="drawPoly(1)">编辑多边形区域</el-button>
    <el-button @click="drawPoly(2)">结束多边形编辑</el-button>

    <div id="map-container" :style="{ height: height,width:width}" class="map_box" />
  </div>

</template>
<script>
// import AMap from 'AMap'
var map, lnglatXY, marker, path, drawStart, polygon
var t = 1
export default {
  props: {
    height: {
      type: String,
      default: '300px'
    },
    mulMarks: {
      type: Boolean,
      default: false
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
          key: 'c8ee257c451ff0c0312aa74edd24b31b',
          zoom: 5, // 地图显示级别
          setMapStyle: '', // 设置自定义个性化地图---将地图生成的链接写入即可如 amap://styles/4df52953371391eb93a57c81b1e633f3
          draggable: true, // 设置标记点是否可以拖拽
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
  data() {
    return {
      polyEditor: '',
      markList: [],
      path: []

    }
  },
  computed: {
    pathL() {
      console.log(this.markList,'this.markList')
      if (this.markList.length > 2 && !drawStart) {
        return this.markList
      } else {
        return [
          [116.403322, 39.920255],
          [116.410703, 39.897555],
          [116.402292, 39.892353]
        ]
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
        // this_.addMarker([116.400274, 39.905812], true)
        this_.addMarker([this_.commitFrom.longitude, this_.commitFrom.latitude], true)
      }
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.PolyEditor'], function() {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())

        // 绘制多边形
        this_.polyEditor = new AMap.PolyEditor(map, polygon)

        // polyEditor.open()
        this_.polyEditor.on('addnode', function(event) {
          console.log('触发事件：addnode')
        })

        this_.polyEditor.on('end', function(event) {
          console.log('触发事件：end', event)
        })
      })
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition: 'RB'
        })
        map.addControl(geolocation)
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete) // 返回定位信息
        AMap.event.addListener(geolocation, 'error', onError) // 返回定位出错信息
      })
      // 解析定位结果
      function onComplete(data) {
        console.log(data, 'data')
        var str = []
        str.push(data.position.getLat())
        str.push(data.position.getLng())
      }

      // 解析定位错误信息
      function onError(data) {
        console.log(data, 'dignweishbai ')
      }
      AMap.service('AMap.Geocoder', function(e) { // 回调函数
        console.log('Geocoder', e)
      })
      map.on('click', function(e) {
        this_.commitFrom.longitude = e.lnglat.lng
        this_.commitFrom.latitude = e.lnglat.lat
        // 填写地址
        this_.writeAddress([e.lnglat.lng, e.lnglat.lat])
        this_.addMarker([e.lnglat.lng, e.lnglat.lat])
      })

      //     this_.path = [
      //     [116.403322, 39.920255],
      //     [116.410703, 39.897555],
      //     [116.402292, 39.892353]
      //     // [116.389846, 39.891365]
      // ]

      
    }
  },
  methods: {
    // 操作多边形的方法
    polygonOpt() {
      let this_  = this
      polygon = new AMap.Polygon({
        path: this_.pathL,
        // path: this_.path,
        strokeColor: '#FF33FF',
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        fillColor: '#1791fc',
        zIndex: 50,
        draggable: true
      })
      map.add(polygon)
      

      AMap.plugin(['AMap.PolyEditor'], function() {
        // 绘制多边形
        this_.polyEditor = new AMap.PolyEditor(map, polygon)

        // polyEditor.open()
        this_.polyEditor.on('addnode', (event) => {
          console.log('触发事件：addnode')
        })

        this_.polyEditor.on('end', (event) => {
          console.log('触发事件：end', event)
        })
      })
      // 矩形区域拖拽事件
      polygon.on('dragging', (e) =>{
        console.log(e, '拖拽区域')
      })
      // 缩放地图到合适的视野级别
      map.setFitView([polygon])
    },
    // 多边形选框操作
    drawPoly(flag) {
      if (this.markList.length <= 2 && !this.path.length) {
        this.$message.warning('请先选择标记点(至少三个)')
        return
      }
      if (!drawStart) {
        this.polygonOpt()
      }
      const this_ = this
      console.log(this.path, 'this.path')
      // if (this.markList.length <= 2 && !this.path.length) {
      //   this.$message.warning('请先选择标记点(至少三个)')
      //   return
      // }
      if (flag === 1) {
        
        this.polyEditor.open()
        drawStart = true
      } else {
        this.polyEditor.close()
      }
    },
    // 实例化点标记
    // mulMarks 地图上有多个覆盖物
    addMarker(lnglatXY, flag) {
      console.log(lnglatXY, 'lnglatXY')
      var thas = this
      if (this.mulMarks) {
        var marker = new AMap.Marker({
          icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: lnglatXY,
          offset: new AMap.Pixel(-13, -30),
          // 设置是否可以拖拽
          draggable: thas.options.draggable,
          cursor: thas.options.cursor,
          // 设置拖拽效果
          raiseOnDrag: thas.options.raiseOnDrag
        })
        marker.on('dragging', showInfoM) // 覆盖物拖拽事件
        marker.on('click', remove) // 覆盖物拖拽事件
        console.log(marker, 'marker')
        if (marker) {
          thas.markList.push([lnglatXY[0], lnglatXY[1]])
        }
        marker.setMap(map)
        // 移除
        function remove(e) {
          console.log(e, '移除')
          map.remove(marker)
        }
        // 拖拽
        function showInfoM(e) {
          console.log(e, 'e')
        }
      } else {
        if (t === 1) {
          // if (t === 1 || flag) {

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
          // map.setFitView() // 执行定位
          t++
        } else {
        // 修改标点位置
        // if (t !== 1) {
          marker.setPosition(lnglatXY)
          map.setCenter(lnglatXY)
          marker.setMap(map)
        // map.setFitView() // 执行定位
        // }
        }
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
