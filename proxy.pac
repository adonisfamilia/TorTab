let type = ""
let host = ""
let port = ""
proxyDNS = false

function FindProxyForURL(url, host) {
    const msg = [{
        type: type,
        host: host,
        port: port,
        proxyDNS: proxyDNS
    }]
    return msg
}

browser.runtime.onMessage.addListener((message) => {
    type = message.type
    host = message.host
    port = message.port
    proxyDNS = message.proxyDNS
})
