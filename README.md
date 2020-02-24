
# 百度地图操作说明
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
https://github.com/menglin1997/maps/blob/master/static/baidu.png
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
