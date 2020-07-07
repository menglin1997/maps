# 基于Vue的高德地图、百度地图、腾讯地图

## 高德地图API

````javascript
// 地图高度
height: {
      type: String,
      default: '300px'
    },
// 地图宽度
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
          key: '',
          zoom: 5, // 地图显示级别
          setMapStyle: '', // 设置自定义个性化地图---将地图生成的链接写入即可如 amap://styles/4df52953371391eb93a57c81b1e633f3
          draggable: false, // 设置标记点是否可以拖拽
          cursor: 'default', // 设置鼠标放上标记点的效果 用法同css样式cursor
          raiseOnDrag: false // 设置鼠标拖动效果  在draggable为true时生效
        }
      }
    },
    // 传入默认经纬度和地址
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
````





# 百度地图操作说明(其他地图同)

## 组件路径
` src/components/baiduMap `

## Data属性
| 参数 | 说明 | 格式 | 值 |
| ------ | ------ | ------ | ------ |
| list| 地图默认经纬度与地址 | Object | `address`(传入地址), `longitude`和`latitude`经纬度 |

例子：
````
 list: {
        address: null,
        longitude: null,
        latitude: null
      }
````
## 图示
![image](https://github.com/menglin1997/maps/blob/master/static/baidu.png)

## 方法
| 方法名称 | 说明 | 参数 |
| ------ | ------ | ------ |
| msg| 点击地图获取到的数据 | 点击地图获取到的数据 |


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
