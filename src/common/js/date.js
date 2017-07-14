export function formatDate(date, fmt) {
  // y+匹配到以y开头一个或者多个，匹配对象是fmt（yyyy-MM-dd hh:mm）匹配到了（yyyy）
  if (/(y+)/.test(fmt)) {
    // 匹配到之后开始替换，用replace()，RegExp.$1是正则分组中第一个匹配分组的内容，也就是（yyyy），date( Sat Jul 23 2016 21:52:44 GMT+0800 (中国标准时间) )
    /*
    * RegExp.$1           :yyyy
    * RegExp.$1.length    :4
    * date.getFullYear()  :2016 //为什么要在后面加个单引号 '' 目的是转成字符串数据类型，因为getFullYear方法返回的值类型是Number
    * substr((4 - RegExp.$1.length))  :4-4=0  //也就是substr(0) 从0开始截取，第二个参数不写默认截取到最后也就是得到2016
    * 总结：yyyy = 2016
    * */
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  // 配置一个对象来批量替换
  let o = {
    'M+': date.getMonth() + 1, // getMonth: 返回月份0~11（ 由于是0-11也就是说0代表1月、1代表2月以此类推，所以要在后面 + 1 ）返回的是6 + 1 = 7（7月）
    'd+': date.getDate(),      // getDate: 返回某一天1~31（ 返回23 ）
    'h+': date.getHours(),     // getHours: 返回小时（ 21/18/16 ）
    'm+': date.getMinutes(),   // getMinutes: 返回分钟（ 52/54/19 ）
    's+': date.getSeconds()    // getSeconds: 返回秒数（ 44/24/24 ）
  }
  for (let k in o) {
    /*
    * RegExp(`(${k})`) :for in 遍历了 o 对象，k 是 o 对象中的属性名也就是 M+ d+ h+ m+ s+
    * 1、先匹配到的是 M+ 也就是/(M+)/.test('yyyy-MM-dd hh:mm')
    *
    * */
    if (new RegExp(`(${k})`).test(fmt)) {
      // 匹配到了 MM 然后str等于 o[k] 这样写就是取值得到了 7 月，后面加单引号''转换成字符串
      let str = o[k] + ''
      /*
      * RegExp.$1: MM
      * (RegExp.$1.length === 1) ? str : padLeftZero(str))：先判断匹配到的值是不是等于1？如果是就直接返回str，如果不是就调用padLeftZero方法给str补0
      * */
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
};

function padLeftZero(str) {
  // str = '7' '00'+'7'='007' str.length的长度是1 substr得到'07'
  return ('00' + str).substr(str.length)
}
