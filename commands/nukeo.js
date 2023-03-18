const Discord = require("discord.js")

exports.run = async (client, message, args) => {

  const onayembed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTimestamp()
  .setAuthor("Nuke Komutu")
  .setFooter("Onaylamak için ?? emojisine, Red etmek içinse ?? emojisine týklayabilirsiniz")
  .setDescription("**UYARI!** \n\nEðer nuke iþlemini onaylarsanýz bu kanal kalýcý olarak **silinecek**,\n**geri getirilemeyecektir!**\nAncak bu kanalýn **kopyasý oluþturulacaktýr!** \n")
  message.channel.send(onayembed).then(msg => {
msg.react('??').then(() => msg.react('??'));

const filter = (reaction, user) => {
	return ['??', '??'].includes(reaction.emoji.name) && user.id === message.author.id;
};

msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '??') {
      message.channel.clone({position: message.channel.position});
      message.channel.delete();
		} else {
			message.reply('Nuke iþlemi iptal edildi!');
      msg.delete({timeout:3000})
		}
	})
	.catch(collected => {
		message.reply('Bir hatayla karþýlaþtýk! Lütfen daha sonra tekrar deneyiniz.');
	});
  
})

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3,
  kategori: "sunucu"
};

exports.help = { 
	name: 'nuke2', 
  description: "Bot bulunduðunuz kanalý siler ve yeniden oluþturur.",
  usage: 'nuke2'
}