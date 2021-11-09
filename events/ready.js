const client = require("../index");
const config = require("../config.json")
const creditos = require("../CREDITS.json")

client.on("ready", () => { 
    
    let a = config.Logs_ini
    let b = client.channels.cache.get(a)
    const Discord = require("discord.js")
  
    console.log(`Estou online`);
    client.user.setActivity("USO COMANDOS DE /")
   b.send({content: `<:719816652572852225:897525071323734016> \`<@${config.owners}>\`\n\n <:751830147996581960:897525071034347541> Estou online! `});
   let channel3 = client.channels.cache.get(config.logs_stats)
   channel3.edit({name: `💹・sᴛᴀᴛᴜs : ᴏɴʟɪɴᴇ`})

  
});
