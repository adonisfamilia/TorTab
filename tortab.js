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
  }
}

createContainer()