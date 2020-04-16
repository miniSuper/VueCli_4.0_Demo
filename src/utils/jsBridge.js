export const setupWebViewJavascriptBridge = (callback) => {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  const WVJBIframe = document.createElement("iframe");
  WVJBIframe.style.display = "none";
  WVJBIframe.src = "https://__bridge_loaded__";
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
};

export const callhandler = (name, data, callback) => {
  setupWebViewJavascriptBridge(function(bridge) {
    bridge.callHandler(name, data, callback);
  });
};

export const registerhandler = (name, callback) => {
  setupWebViewJavascriptBridge(function(bridge) {
    bridge.registerHandler(name, function(data, responseCallback) {
      callback(data, responseCallback);
    });
  });
};
