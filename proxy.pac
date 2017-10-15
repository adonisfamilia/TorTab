function FindProxyForURL(url, host) {
  const msg = [{
        type: "socks",
        host: "localhost",
        port: 9050,
        proxyDNS: true
  }]
  return msg
}
