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


//ATILDIM

 client.on("guildDelete", guild => {
    let left =  client.channels.cache.get("1081831984889860146") // channel ID girmeyi unutmayın!
    const atıldım = new Discord.EmbedBuilder()
    
    .setTitle(`Sunucudan Atıldım!`)
    .setColor("#f8ac1d")
    .addFields({ name: 'Sunucusu İsmi', value: `${guild.name}` })
    .addFields({ name: 'Sunucusu İD', value: `${guild.id}` })  //kromTarafındanYapıldı
    .addFields({ name: 'Sunucusu Kurucusu', value: `<@${guild.ownerId}>` })  //kromTarafındanYapıldı
    .addFields({ name: 'Sunucusu Kurucusu İD ', value: `${guild.ownerId}`, inline: true })
    .addFields({ name: 'Üye Sayısı', value: `${guild.memberCount}` }) //kromTarafındanYapıldı
  
    left.send({ embeds: [atıldım] })
  
    });

//KATILDIM

client.on("guildCreate", guild => {
  let add =  client.channels.cache.get("1081831984889860146") // channel ID girmeyi unutmayın!
  const eklendim = new Discord.EmbedBuilder()
  
  .setTitle(`Sunucuya Eklendim`) 
  .setColor("#f8ac1d")
  .addFields({ name: 'Sunucusu İsmi', value: `${guild.name}` })
  .addFields({ name: 'Sunucusu İD', value: `${guild.id}` })
  .addFields({ name: 'Sunucusu Kurucusu', value: `<@${guild.ownerId}>` })
  .addFields({ name: 'Sunucusu Kurucusu İD ', value: `${guild.ownerId}`, inline: true }) 
  .addFields({ name: 'Üye Sayısı', value: `${guild.memberCount}` })  
  add.send({ embeds: [eklendim] })

  });
//AFK
client.on("messageCreate", async message => {
  const db = require("croxydb");

  if (await db.get(`afk_${message.author.id}`)) {
   
    db.delete(`afk_${message.author.id}`);

    message.channel.send("AFK Moduna girmiştin. Şimdi çıktın hoşgeldin");
  }

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  var sebep = await db.get(`afk_${kullanıcı.id}`);

  if (sebep) {
    message.reply("Etiketlediğin Kullanıcı **"+sebep+"** Sebebiyle Afk Modunda!");
  }
});

//SES E GİRME 

const { joinVoiceChannel } = require('@discordjs/voice');
 client.on('ready', () => { 
  joinVoiceChannel({
channelId: "1081830644411289610", //SES KANALIN İD
guildId: "1065317855895240834", //SUNUCU İD       
adapterCreator: client.guilds.cache.get("1065317855895240834").voiceAdapterCreator//SUNUCU İD
    });
});
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
