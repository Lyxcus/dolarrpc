const fetch = require("node-fetch")
const RPC = require("discord-rpc");
const moment = require("moment")
const conf = require("./config.json")
const rpc = new RPC.Client({
  transport: "ipc"
})
rpc.on("ready", () => {
  setInterval(function () {
    fetch("https://api.bigpara.hurriyet.com.tr/doviz/headerlist/anasayfa").then(async r => {
      const json = await r.json();
      const dolarobj = json.data.filter(c => c.SEMBOL == "USDTRY")[0]
      moment.locale("TR")
      const activity = {
        details: "Dolar " + dolarobj.SATIS + " TL",
        state: "" + moment().format('LLL') + "",

        assets: {
          large_image: conf.largeImage,
          large_text: conf.largeImageText
        },

        buttons: [
          {
            "label": conf.label1,
            "url": conf.URL1,
          },
          {
            "label": conf.label2,
            "url": conf.URL2
          }
        ],
        instance: true

      }

      rpc.request("SET_ACTIVITY", { pid: process.pid, activity: activity });
    })
  }, 5000)

})

rpc.login({
  clientId: conf.appId
})



