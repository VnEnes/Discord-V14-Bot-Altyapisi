const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (message.author.bot) return;
 

 message.delete();

const mesaj = new Discord.EmbedBuilder()
  .setDescription("Merhaba Davet Linkim : [TIKLA](https://discord.com/api/oauth2/authorize?client_id=1010085793148182598&permissions=8&scope=bot)")
 message.channel.send({embeds: [mesaj]})



}

  exports.conf = {
  aliases: ["davet","davetet"]
};

exports.help = {
  name: "davet"
};