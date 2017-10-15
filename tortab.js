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
    if (details.tabId !== browser.tabs.TAB_ID_NONE) {
        const tab = await browser.tabs.get(details.tabId)
        const setting = await browser.storage.local.get([tab.cookieStoreId])
        if (setting[tab.cookieStoreId]) {
            browser.proxy.register("proxy.pac")
            return {}
        }
    }
    return {}
}, {urls: ["<all_urls>"]}, ["blocking"])
