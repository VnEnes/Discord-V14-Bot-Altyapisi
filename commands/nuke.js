const Discord = require("discord.js");

module.exports.run = async(client,message,args) => {

if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return message.reply(`   **Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.**`);
message.channel.clone({position: message.channel.position});
message.channel.delete();

};
module.exports.conf = {
enabled: true,
guildOnly: false,
aliases:[],
permLevel: 0.
};
module.exports.help = {
name: 'nuke',
description: 'Kanalı Siler Aynı Özelliklere Sahip Kanal Açar.',
usage: 'nuke'
};