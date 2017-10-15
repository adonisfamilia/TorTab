function FindProxyForURL(url, host) {
  return [{
type: "socks",
        host: host,
        port: 9050,
        proxyDNS: true,
  }]
}

browser.runtime.onMessage.addListener((message) => {
    if (message.enabled) {
    browser.runtime.sendMessage("I'm enabled!");
    }
    });
