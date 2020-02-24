<template>
  <div class="filter-container">

    <div id="bmap" />
    <div id="r-result" style="margin-top: 20px;">

      <div id="r-result" style="margin-top: 20px;">
        请搜索您的地址:
        <input
          id="suggestId"
          v-model="mapSearchVal"
          type="text"
          placeholder="请搜索您的地址"
          clearable
          prefix-icon="el-icon-search"
          size="20"
          value=""
          style="width:200px;margin-left: 10px;" ></div>
      <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"/>
    </div>
</div></template>

<script>
var map
import BaiduMap from './map.js'
export default {
  name: 'AddNews',
  props: {
    list: {
      type: Object,
      default: {
        address: null
      }
    }
  },
  data() {
    return {
      mapSearchVal: null,

      address: null // 省市区拼接

      // list: {
      //   addressCode: '', // 省市区中午拼接
      //   address: '',
      //   businessName: '',
      //   city: 0,
      //   district: 0,
      //   province: 0,
      //   landlineTelephone: '',
      //   latitude: 0,
      //   linkMan: '',
      //   longitude: 0,
      //   phoneNumber: '',

      //   businessId: null
      // }
    }
  },
  watch: {
    list(val) {
      console.log(val, 'vas')
      map.centerAndZoom(new BMap.Point(val.longitude, val.latitude), 11)
    }
  },
  created() {
    this.getMap()
  },

  methods: {
    getMap() {
      this.$nextTick(function() {
        var this_ = this
        BaiduMap.init().then(BMap => {
          map = new BMap.Map('bmap', { enableMapClick: true })
          let marker = ''
          var geolocation = new BMap.Geolocation()
          setTimeout(() => {
            console.log(this_.list, 'this_.list')
            if (
              this_.list.address &&
              this_.list.longitude !== 0 &&
              this_.list.latitude !== 0
            ) {
              map.centerAndZoom(new BMap.Point(this_.list.longitude, this_.list.latitude), 11)
              marker = new BMap.Marker(
                new BMap.Point(this_.list.longitude, this_.list.latitude)
              )
            } else {
              geolocation.getCurrentPosition(function(c) {
                if (this.getStatus() === 0) {
                  map.centerAndZoom(c.address.city, 11)
                } else {
                  this_.$message({
                    type: 'error',
                    message: '获取位置信息失败，已为您重置为北京'
                  })
                  map.centerAndZoom('北京', 11)
                }
              })
            }
            marker = new BMap.Marker(
              new BMap.Point(this_.list.longitude, this_.list.latitude)
            )
            map.addOverlay(marker)
          }, 1000)
          var topLeftNavigation = new BMap.NavigationControl() // 左上角，添加默认缩放平移控件
          map.addControl(topLeftNavigation)
          map.addOverlay(marker)
          map.enableScrollWheelZoom(true)
          var geoc = new BMap.Geocoder()
          map.addEventListener('click', function(e) {
            map.clearOverlays()
            if (!this_.list) {
              this_.list = {}
            }
            geoc.getLocation(e.point, function(rs) {
              console.log(rs, '获取到的')
              this_.$emit('msg', rs)
              var addComp = rs.addressComponents
              this_.list.longitude = e.point.lng
              this_.list.latitude = e.point.lat
              this_.list.address = addComp.district + addComp.street + addComp.streetNumber
              marker = new BMap.Marker(
                new BMap.Point(this_.list.longitude, this_.list.latitude)
              )
              map.addOverlay(marker)
            })
          })
          // 建立一个自动完成的对象
          var ac = new BMap.Autocomplete({ 'input': 'suggestId', 'location': map })
          console.log(ac, 'ac')
          var myValue
          ac.addEventListener('onconfirm', function(e) { // 鼠标点击下拉列表后的事件
            var _value = e.item.value
            myValue = _value.province + _value.city + _value.district + _value.street + _value.business
            this_.mapSearchVal = myValue
            setPlace()
          })

          function setPlace() {
            map.clearOverlays() // 清除地图上所有覆盖物
            function myFun() {
              var pp = local.getResults().getPoi(0).point // 获取第一个智能搜索的结果
              map.centerAndZoom(pp, 18)
              map.addOverlay(new BMap.Marker(pp)) // 添加标注
            }
            var local = new BMap.LocalSearch(map, { // 智能搜索
              onSearchComplete: myFun
            })
            local.search(myValue)
          }
        })
      })
    }
  }
}
</script>
<style>
#bmap {
  width: 100%;
  height: 550px;
}
.el-form-item__label {
  float: left;
}
</style>
