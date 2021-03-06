// ==UserScript==
// @name         百度搜索直链
// @namespace    https://github.com/l619534951
// @version      1.0
// @description  百度搜索结果页面，搜索链接替换为直链
// @author       沙滩上de水瓶
// @match        *.baidu.com/s?*
// @connect      baidu.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
  'use strict';
  setRealUrl()

  function setRealUrl() {
    let resultTagAs = getAllTagAFrom(getAllResultItem())
    resultTagAs.forEach(resultTagA => {
      setRealUrlFor(resultTagA)
    })
  }

  function setRealUrlFor(resultItemTagA) {
    let originUrl = resultItemTagA.getAttribute("href").replace(/^http:/, "https:")
    GM_xmlhttpRequest({
      url: originUrl,
      headers: {"Accept": "*/*", "Referer": originUrl},
      method: "GET",
      timeout: 10000,
      onload: function (rsp) {
        if (rsp.status === 200) {
          resultItemTagA.setAttribute("href", rsp.finalUrl)
        }
      }
    });
  }

  function getAllTagAFrom(allResultItems) {
    return getAllResultItem().map(resultItem => resultItem.querySelector("a"))
  }

  function getAllResultItem() {
    return [...document.querySelectorAll("#content_left>div")]
  }
})();
