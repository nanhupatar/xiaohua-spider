// 加载第三方库
var request = require('request'),
  iconv = require('iconv-lite');

// 要抓取的url
var url = 'http://www.xiaohuar.com/list-1-0.html';

// begin
request.get({
  url: url,
  encoding: null //buffer
}, function (err, response, body) {
  if (!err && response.statusCode === 200) {
    body = iconv.decode(body, 'gb2312'); //deal with code transform
    console.log(body);
  } else {
    console.error("请求失败", err);
  }
})

/** 
 * 总结：
 * 
 * 2. 在test1的基础上，处理解决乱码问题
 * 主要是通过iconv-lite这个库来进行编码转换
 * 使用的方式很简单，让body直接是buffer
 * 首先让request请求的返回直接buffer
 * 然后iconv.decode(body,'gb2312')即可
 * 
 * 1. 这是一个简单的请求页面数据的方式
 * 通过request来请求次页面数据
 * 此库是对http这个标准库的封装
 * 。。。
*/