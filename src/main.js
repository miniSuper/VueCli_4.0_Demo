// import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import directive from "./directive";

window.Vue.config.productionTip = false;
import { isIOS, isAndroid, getAppMessage } from "@/utils/index";
import { setupWebViewJavascriptBridge } from "@/utils/jsBridge";

if (isIOS()) {
  setupWebViewJavascriptBridge((bridge) => {
    initVueApp();
  });
} else if (isAndroid()) {
  window.timer = setInterval(() => {
    if (window.live) {
      clearInterval(window.timer);
      initVueApp();
    }
  }, 200);
} else {
  initVueApp();
}

async function initVueApp() {
  if (!window.location.href.indexOf("isWap")) {
    // 在app内打开 非手机浏览器或微信端
    await getAppMessage();
  }
  new window.Vue({
    el: "#app",
    router,
    store,
    directive,
    components: { App },
    template: "<App/>",
  });
}
