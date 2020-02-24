import wx from 'weixin-js-sdk'
import { QryWxSignature, QryWebAccessToken, GetUserInfo } from '@/api/mine'

function GetOpenId(that, wxappid, callback) {
  // alert('进入获取OPENID')
  var code = getQueryString('code')
  // var redirecturl = encodeURIComponent('http://pay.xianghuali.cn/wx/index.html') // ${process.env.BASE_API}
  var redirecturl = encodeURIComponent(window.location.href) // ${process.env.BASE_API}
  // alert(code)
  if (!code && !that.$store.state.useropenid) {
    window.location.href =
      'http://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      wxappid +
      '&redirect_uri=' +
      redirecturl +
      '&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect'
  } else if (code && !that.$store.state.useropenid) {
    // alert(code)
    QryWebAccessToken({
      code: code
    }).then(response => {
      if (response.openid) {
        that.$store.state.useropenid = response.openid
        GetUserInfo({
          openId: response.openid
        }).then(res => {
          that.$store.state.userInfo = res
          if (callback) {
            callback()
          }
        })
      }
    })
  } else {
    if (callback) {
      callback()
    }
  }
  // alert(that.$store.state.useropenid)
}

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
var AppId = ''
var Timestamp = ''
var Signature = ''
var Noncestr = ''
function GetSignature(callback) {
  QryWxSignature({
    url: window.location.href.split('#')[0]
  }).then(data => {
    AppId = data.appId
    Timestamp = data.timestamp
    Signature = data.signature
    Noncestr = data.nonceStr
    wx.config({
      beta: true,
      debug: false,
      appId: AppId,
      timestamp: Timestamp,
      nonceStr: Noncestr,
      signature: Signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard',
        'openWXDeviceLib',
        'closeWXDeviceLib',
        'configWXDeviceWiFi',
        'getWXDeviceInfos',
        'sendDataToWXDevice',
        'startScanWXDevice',
        'stopScanWXDevice',
        'connectWXDevice',
        'disconnectWXDevice',
        'getWXDeviceTicket',
        'WeixinJSBridgeReady',
        'onWXDeviceBindStateChange',
        'onWXDeviceStateChange',
        'onScanWXDeviceResult',
        'onReceiveDataFromWXDevice',
        'onWXDeviceBluetoothStateChange'
      ]
    })
    wx.ready(function() {
      if (callback) callback()
    })
  })
}
function Format() {
  // eslint-disable-next-line no-extend-native
  Date.prototype.format =
    Date.prototype.format ||
    function(fmt) {
      var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
        }
      }
      return fmt
    }
}

function GetDateDiff(startTime, endTime, diffType) {
  // 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  startTime = startTime.replace(/\-/g, '/')
  endTime = endTime.replace(/\-/g, '/')
  // 将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase()
  var sTime = new Date(startTime) // 开始时间
  var eTime = new Date(endTime) // 结束时间
  // 作为除数的数字
  var timeType = 1
  switch (diffType) {
    case 'second':
      timeType = 1000
      break
    case 'minute':
      timeType = 1000 * 60
      break
    case 'hour':
      timeType = 1000 * 3600
      break
    case 'day':
      timeType = 1000 * 3600 * 24
      break
    default:
      break
  }

  var time = parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType))
  if (time !== null && time !== '') {
    if (time > 60 && time < 60 * 60) {
      time =
        parseInt(time / 60.0) +
        '分钟' +
        parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) +
        '秒'
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      time =
        parseInt(time / 3600.0) +
        '小时' +
        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
        '分钟' +
        parseInt(
          (parseFloat(
            (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
          ) -
            parseInt(
              (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
            )) *
            60
        ) +
        '秒'
    } else if (time >= 60 * 60 * 24) {
      time =
        parseInt(time / 3600.0 / 24) +
        '天' +
        parseInt(
          (parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) * 24
        ) +
        '小时' +
        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
        '分钟' +
        parseInt(
          (parseFloat(
            (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
          ) -
            parseInt(
              (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
            )) *
            60
        ) +
        '秒'
    } else {
      time = parseInt(time) + '秒'
    }
  }
  return time
}

export { GetOpenId, GetSignature, Format, GetDateDiff }
