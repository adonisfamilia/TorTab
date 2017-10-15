async function createContainer(){
    const checkContainer = await browser.contextualIdentities.query({
        name: 'Tor'
    })
    if(checkContainer.length === 0) {
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
    console.log('here')
    if (details.tabId !== browser.tabs.TAB_ID_NONE) {
        const tab = await browser.tabs.get(details.tabId)
        const setting = await browser.storage.local.get([tab.cookieStoreId])
        if (setting[tab.cookieStoreId]) {
            if (details.proxyInfo === null) {
                await browser.proxy.register("proxy.pac")
            } else {
                return {}
            }
        } else {
            if (details.proxyInfo !== null) {
                await browser.proxy.unregister()
            } else {
                return {}
            }
        }
        const redirectUrl = details.url
        return {redirectUrl}
    }
    return {}
}, {urls: ["<all_urls>"]}, ["blocking"])
