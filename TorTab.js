browser.proxy.register("proxy.pac")
let messageToProxy = {
  enabled: true,
  foo: "A string",
  bar: 1234
}

browser.runtime.sendMessage(messageToProxy, {toProxyScript: true});

