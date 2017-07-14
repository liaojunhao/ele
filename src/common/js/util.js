/*
* 解析url参数
* @example ?id=12345&a=b
* @return Object {id:123,a:b}
*
* */
export function queryURLParameter(url) {
  url = url || window.location.search
  let obj = {}
  var reg = /([^?=&]+)=([^?=&]+)/g
  url.replace(reg, function () {
    obj[arguments[1]] = arguments[2]
  })
  return obj
}
