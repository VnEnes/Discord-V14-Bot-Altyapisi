const Discord = require("discord.js")

exports.run = async (client, message, args) => {

  const onayembed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTimestamp()
  .setAuthor("Nuke Komutu")
  .setFooter("Onaylamak i�in ?? emojisine, Red etmek i�inse ?? emojisine t�klayabilirsiniz")
  .setDescription("**UYARI!** \n\nE�er nuke i�lemini onaylarsan�z bu kanal kal�c� olarak **silinecek**,\n**geri getirilemeyecektir!**\nAncak bu kanal�n **kopyas� olu�turulacakt�r!** \n")
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
			message.reply('Nuke i�lemi iptal edildi!');
      msg.delete({timeout:3000})
		}
	})
	.catch(collected => {
		message.reply('Bir hatayla kar��la�t�k! L�tfen daha sonra tekrar deneyiniz.');
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
  description: "Bot bulundu�unuz kanal� siler ve yeniden olu�turur.",
  usage: 'nuke2'
}