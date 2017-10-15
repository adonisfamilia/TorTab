function FindProxyForURL(url, host) {
  const mess = [{
        type: "socks",
        host: "localhost",
        port: 9050,
        proxyDNS: true
  }]
  return mess
}

browser.runtime.onMessage.addListener((message) => {
    if (message.enabled) {
    browser.runtime.sendMessage("I'm enabled!");
    }
    });
