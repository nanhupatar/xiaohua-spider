// 加载第三方库
var request = require('request'),
    iconv = require('iconv-lite'),
    cheerio = require('cheerio'),
    async = require('async');

// 要抓取的页数，因为学习才写死10页
var count = 10;
var urlsList = []; //待抓取的页面地址
var xiaohuarUrlsList = []; //待要抓取的页面详情地址

// 处理要抓取的页面地址
for (var i = 0; i < count; i++) {
  urlsList.push('http://www.xiaohuar.com/list-1-' + i + '.html');
}

// 查看要抓取的页面地址
console.log(urlsList);

// 开始批量抓取，一次抓5页，分批抓取

async.forEachLimit(urlsList, 5, function (url, callback) {
  request.get({
    url: url,
    encoding: null
  }, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      body = iconv.decode(body, 'gb2312'); //处理转码问题
      var $ = cheerio.load(body); //解析页面
      // 拿到了页面的相关链接
      $('#list_img').find('.item').each(function (item) {
        var xiaohuaUrl = $(this).find('a').attr('href'); //获取这个页面我们要抓的url
        console.log(xiaohuaUrl);
        /**
         * 经过抓取发现格式不统一
         * /p-1-146.html
         * http://www.xiaohuar.com/p-1-584.html
         * 所以统一一下格式
         */

        xiaohuaUrl = 'http://www.xiaohuar.com' + xiaohuaUrl.replace('http://www.xiaohuar.com', '');
        xiaohuarUrlsList.push(xiaohuaUrl);
      })
      callback();
    } else {
      console.error('请求失败', err);
      // 因为我们不希望报错停止抓取 所以不拦截报错
      callback();
    }
  })
}, function (error, result) {
  // 批量抓取的结果
  if (error) {
    console.error('获取详情列表页失败', error);
  } else {
    console.log('批量抓取列表页结束, 共计获取了', xiaohuaUrlsList.length, '条详情页数据');
  }
  })

  