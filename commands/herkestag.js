
const ms = require('ms');
const db = require('quick.db');
const Discord = require('discord.js');


module.exports.run = async(client, message, args, tools) => {
  if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return message.reply(`   **Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.**`);
  
  const tag = args[0]
  if(!tag) return message.reply(" :x:  Herkese vereceğim tagı yazmalısın! Örnek: `.herkesetagver `")
  
  message.guild.members.cache.forEach(user => {
    user.setNickname(`${tag} | ${user.user.username}`).catch(err => message.channel.send(`Kurucu olduğun için ismini değiştiremiyorum!`) ? console.log("Yetkim yok.") :  null)
  });
  
  message.reply("Başarılı, herkesin ismini değiştirdim.")

  
  
};


exports.conf = {
  aliases: ["herkese-tag-ver"],
  permLevel: 0,
};
exports.help = {
  name: 'herkesetagver',
   description: 'Susturma',
  usage: 'timeout <@kullanıcı> <süre>'
};