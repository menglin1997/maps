// export function MP(ak) {
//     console.log(ak)
//     return new Promise(function (resolve, reject) {
//         window.onload = function () {
//             console.log(11)
//             resolve(BMap)
//         }
//         console.log(22)
//         var script = document.createElement("script");
//         script.type = "text/javascript";
//         script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init";
//         script.onerror = reject;
//         document.head.appendChild(script);
//     })
// }

// export default {
//   init: function (){
//     console.log("初始化百度地图脚本...");
//     const AK = "bmPMX9zxrAM0Q2sllQxZvjycZwQGllrr";
//     const apiVersion = "3.0";
//     const timestamp = new Date().getTime();
//     const BMap_URL = "http://api.map.baidu.com/getscript?v="+ apiVersion +"&ak="+ AK +"&services=&t=" + timestamp;
//     return new Promise((resolve, reject) => {
//     if(typeof BMap !== "undefined") {
//         resolve(BMap);
//         return true;
//     }

//     // 插入script脚本
//     let scriptNode = document.createElement("script");
//     scriptNode.setAttribute("type", "text/javascript");
//     scriptNode.setAttribute("src", BMap_URL);
//     document.body.appendChild(scriptNode);

//     // 等待页面加载完毕回调
//     let timeout = 0;
//     let interval = setInterval(() => {
//         // 超时10秒加载失败
//         if(timeout >= 20) {
//         reject();
//         clearInterval(interval);
//         console.error("百度地图脚本初始化失败...");
//         }
//         // 加载成功
//         if(typeof BMap !== "undefined") {
//         resolve(BMap);
//         clearInterval(interval);
//         console.log("百度地图脚本初始化成功...");
//         }
//         timeout += 1;
//     }, 500);
//     });
//   }
// }

export default {
  init: function() {
    // console.log("初始化百度地图脚本...");
    const AK = '你的key值'
    const BMap_URL = 'https://api.map.baidu.com/api?v=2.0&ak=' + AK + '&s=1&callback=onBMapCallback'
    return new Promise((resolve) => {
      // 如果已加载直接返回
      if (typeof BMap !== 'undefined') {
        resolve(BMap)
        return true
      }
      // 百度地图异步加载回调处理
      window.onBMapCallback = function() {
        console.log('百度地图脚本初始化成功...')
        resolve(BMap)
      }

      // 插入script脚本
      const scriptNode = document.createElement('script')
      scriptNode.setAttribute('type', 'text/javascript')
      scriptNode.setAttribute('src', BMap_URL)
      document.body.appendChild(scriptNode)
    })
  }
}
