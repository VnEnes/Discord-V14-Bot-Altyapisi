const {EmbedBuilder} = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
exports.run = async (client, message, args) => {
    var kullanıcı = message.author;
    var sebep = args.slice(0).join("  ");
    
      if (!sebep) return message.channel.send("Neden AFK Olmak İstiyorsun? Sebebini Yazar mısın?"
      );
      const row = new Discord.ActionRowBuilder()
      .addComponents(
new Discord.ButtonBuilder()
.setLabel("Evet")
.setStyle(Discord.ButtonStyle.Success)
.setCustomId("Evet")  

      )
message.reply({content: "Afk Olmak İstediğine Eminmisin ?", components: [row]}).then(msg => {
    msg.createMessageComponentCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
      let interaction = button
        if (interaction.customId == "evet") {
    msg.delete()
        message.channel.send("AFK Moduna Geçiş Yaptın.")
        
      db.set(`afk_${kullanıcı.id}`, sebep);
        }
    })
})
}
exports.conf = {
  aliases: []
};

exports.help = {
  name: "afk"
};

//SES KODU

