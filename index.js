const { Client, GatewayIntentBits, Partials, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require("discord.js");
const Discord = require("discord.js")
const config = require("./config.js");
let prefix = config.prefix
const db = require("croxydb")
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const client = global.client = new Discord.Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});


module.exports = client;

require("./events/message.js") 

require("./events/ready.js")


client.login(config.token || process.env.token)


//SA-AS
client.on("messageCreate", (message) => {
  
  let saas = db.fetch(`saas_${message.guild.id}`)
  if(!saas) return;
  
  if(saas) {
  
  let selaamlar = message.content.toLowerCase()  
if(selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'Selamün Aleyküm' || selaamlar === 'selam'){

message.channel.send(`<@${message.author.id}> Aleykümselam, Hoşgeldin ☺️`)
}
}
})
//REKLAM ENGEL

client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let reklamlar = db.fetch(`reklamengel_${message.guild.id}`)
  if(!reklamlar) return;
  
  if(reklamlar) {

  const linkler = [
    
    ".com.tr",
    ".net",
    ".org",
    ".tk",
    ".cf",
    ".gf",
    "https://",
    ".gq",
    "http://",
    ".com",
    ".gg",
    ".porn",
    ".edu",
    ".xyz",
    ".gg"
       
  ]
  
if(linkler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`Hey <@${message.author.id}>, Bu Sunucuda Reklam Engel Sistemi Aktif! `)
}
}
})

//KÜFÜR ENGEL 

client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let kufur = db.fetch(`kufurengel_${message.guild.id}`)
  if(!kufur) return;
  
  if(kufur) {
  const kufurler = [
    
    "amk",
    "piç",
    "yarrak",
    "oç",
    "göt",
    "amq",
    "yavşak",
    "amcık",
    "amcı",
    "orospu",
    "sikim",
    "sikeyim",
    "aq",
    "mk"
       
  ]
  
if(kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`Hey <@${message.author.id}>, Bu Sunucuda Küfür Engel Sistemi Aktif! `)
}
}
})

//SAYAÇ


client.on('guildMemberAdd', async member => {
  let sayac = db.fetch(`sayac_${member.guild.id}`)
  let kalan = sayac.sayi - member.guild.memberCount || '?'
  if(!kalan) return;
  if(!sayac) return;
  
  client.channels.cache.get(sayac.kanal).send(":mega: Hoşgeldin **"+member.user.username+"** Seninle Beraber `"+member.guild.memberCount+"` Kişi Olduk, `"+sayac.sayi+"` Kişi Olmamıza Son `"+kalan+"` Kişi Kaldı! :tada: ")
  
});
client.on('guildMemberRemove', async member => {
  
  let sayac = db.fetch(`sayac_${member.guild.id}`)
  let kalan = sayac.sayi - member.guild.memberCount
  if(!sayac) return;
  
  client.channels.cache.get(sayac.kanal).send(":envelope_with_arrow: Görüşürüz **"+member.user.username+"** Sen Gittiğin İçin `"+member.guild.memberCount+"` Kişi Olduk!")
  
});

client.on('guildMemberAdd', async member => {
  
  let otorol = db.fetch(`otorol_${member.guild.id}`)
  if(!otorol) return;
  
  client.channels.cache.get(otorol.kanal).send(":mega: **"+member.user.tag+"** Kullanıcı Katıldı! Gerekli Rolleri Verdim. <:blurple_check:948646981260148747>")
  member.roles.add(otorol.rol).catch(() => {})
  
});

//KÜFÜR ENGEL

client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let kufur = db.fetch(`kufurengel_${message.guild.id}`)
  if(!kufur) return;
  
  if(kufur) {
  const kufurler = [
    
    "amk",
    "piç",
    "yarrak",
    "oç",
    "göt",
    "amq",
    "yavşak",
    "amcık",
    "amcı",
    "orospu",
    "sikim",
    "sikeyim",
    "aq",
    "mk"
       
  ]
  
if(kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`Hey <@${message.author.id}>, Bu Sunucuda Küfür Engel Sistemi Aktif! `)
}
}
})

process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p);
})

process.on("unhandledRejection", async (error) => {
    return console.log("Bir hata oluştu! " + error)
})
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


//aaaaaaaaa
