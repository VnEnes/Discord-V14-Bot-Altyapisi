const client = require("../index");
const { Collection } = require("discord.js")
const fs = require("fs")
const config = require("../config.js")
client.on("ready", () => {

  client.user.setActivity(`VnBot Altyapı`)
client.user.setStatus("dnd")

  client.commands = new Collection();
  client.aliases = new Collection();
  fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    console.log(`Toplam ${files.length} tane komut var!`);
    files.forEach(f => {
      let props = require(`../commands/${f}`);

      console.log(`${props.help.name} Adlı Komut Yüklendi!`);


      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
        console.log(`${client.user.tag} Discorda giriş yaptı`)
      });
    });
  });

});
