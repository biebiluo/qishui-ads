// 汽水音乐净化响应处理：对应墨鱼 QiShuiMusicAds.conf 的 jsonjq 规则
// 按请求 URL 分支处理，未匹配到的接口原样返回
const url = $request.url;
let obj = null;
try {
  obj = JSON.parse($response.body);
} catch (e) {
  obj = null;
}
if (obj && typeof obj === 'object') {
  if (url.indexOf('/luna/me') !== -1) {
    delete obj.reward_ad_banner;
  } else if (url.indexOf('/luna/card') !== -1) {
    delete obj.preview_guide;
  } else if (url.indexOf('/luna/search-block') !== -1) {
    delete obj.search_chart_block;
  } else if (url.indexOf('/luna/activities') !== -1) {
    delete obj.activity_map;
  } else if (url.indexOf('/luna/feed/song-tab') !== -1) {
    if (Array.isArray(obj.items)) {
      obj.items = obj.items.filter(function (item) {
        return item && item.type === 'track';
      });
    }
  }
  $done({ body: JSON.stringify(obj) });
} else {
  $done({});
}
