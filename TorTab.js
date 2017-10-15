// browser.proxy.register("proxy.pac")

let createContext = browser.contextualIdentities.create(
  {
    name: "TorTab",
    color: "purple",
    icon: "fingerprint"
  }
).then(() => console.log('we did a thing'))

browser.runtime.onMessage.addListener((message, sender) => {
  if (sender.url === browser.extension.getURL("proxy.pac")) {
    console.log(message);
  }
});

let messageToProxy = {
    enabled: true,
    foo: "A string",
    bar: 1234
};

browser.runtime.sendMessage(messageToProxy, {toProxyScript: true});
