const fetch = require("node-fetch")
const RPC = require("discord-rpc");
const moment = require("moment")
const rpc = new RPC.Client({
  transport: "ipc"
})
rpc.on("ready", () => {
  setInterval(function () {
    fetch("https://api.bigpara.hurriyet.com.tr/doviz/headerlist/anasayfa").then( async r => {
      const json = await r.json();
      // console.log(json)
      const dolarobj = json.data.filter(c => c.SEMBOL == "USDTRY")[0]
      // console.log(dolarobj)
      moment.locale("TR")
      const activity = {
        details: "Dolar " + dolarobj.SATIS + " TL",
        state: "" + moment().format('LLL') + "",

        assets: {
          large_image: "dolar",
          large_text: "Dolar"
        },

        buttons: [
          {
            "label": "Site",
            "url": "https://lyxcus.com",
          },
          {
            "label": "Discord",
            "url": "https://dc.lyxcus.com"
          }
        ],
        instance: true

      }

      rpc.request("SET_ACTIVITY", { pid: process.pid, activity: activity });

      console.log("dolar " + dolarobj.SATIS + " TL");
    })
  }, 5000)

})

rpc.login({
  clientId: "922570634599465051"
})



