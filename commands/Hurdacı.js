const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (message.author.bot) return;
 


  
const mesaj = new Discord.EmbedBuilder()
  
.setTitle("Hurdacı Geliyah") 
.setImage("https://i.ytimg.com/vi/Es4bKgfrC0Q/mqdefault.jpg")
 
message.channel.send({embeds: [mesaj]})
  
    
}

  exports.conf = {
  aliases: []
};

exports.help = {
  name: "hurdacı-geliyah"
};