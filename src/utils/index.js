const USERAGENT = navigator.userAgent;

export function isAndroid() {
  return USERAGENT.indexOf("Android") > -1 || USERAGENT.indexOf("Linux") > -1;
}

export function isIOS() {
  return !!USERAGENT.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

export function isWinXin() {
  return USERAGENT.toLowerCase().indexOf("micromessenger") !== -1;
}

// 获取APP端传来的公共参数
export function getAppMessage() {
  const APP_PARAMS_NAME = ""; //和移动端约定的属性名
  return new Promise((resolve, reject) => {
    if (isIOS()) {
      window.WebViewJavascriptBridge.callHandler(APP_PARAMS_NAME, {}, function(
        data
      ) {
        window.pubrep = data;
        resolve(data);
      });
    } else if (isAndroid()) {
      const pubrep = window.live.pubrep();
      window.pubrep = JSON.parse(pubrep);
      resolve(pubrep);
    }
  });
}
