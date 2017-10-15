browser.proxy.register("proxy.pac")

    async function createContainer(){
    const checkContainer = await browser.contextualIdentities.query({
        name: 'Tor'
    })
    if(checkContainer.length === 0){
        const identity = await browser.contextualIdentities.create({
            name: 'Tor',
            icon: 'fingerprint',
            color: 'purple'
        })
        browser.storage.local.set({
            [identity.cookieStoreId]: true
        })
    }
}

createContainer()

browser.webRequest.onBeforeRequest.addListener(async function (details) {
    console.log(JSON.stringify(details))
    if (details.tabId !== browser.tabs.TAB_ID_NONE) {
        const tab = await browser.tabs.get(details.tabId)
        const setting = await browser.storage.local.get([tab.cookieStoreId])
        let messageToProxy = {}
        if (setting[tab.cookieStoreId]) {
            messageToProxy = {
                type: "socks",
                host: "localhost",
                port: 9050,
                proxyDNS: true
            }
        } else {
            messageToProxy = {
                type: details.proxyInfo.type,
                host: details.proxyInfo.host,
                port: details.proxyInfo.port,
                proxyDNS: details.proxyInfo.proxyDNS
            }
        }
        await browser.runtime.sendMessage(messageToProxy, {toProxyScript: true})
    }
    return {}
}, {urls: ["<all_urls>"]}, ["blocking"])
