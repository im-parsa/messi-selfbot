const Discord = require('discord.js-self');
const fs = require('fs');
const client = new Discord.Client();
const prefix = "<@!719105155575971851>"
const ffmpeg = require("ffmpeg-static");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
// ==============================

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: "dnd",
        activity: {
            name: `Football ⚽`,
            type: "WATCHING",
        },
    });
});

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`| ✅ ${f} loaded! `);
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.on("message", async message => {
    
      let args = message.content.slice(prefix.length).trim().split(/ +/g);
      let cmd = args.shift().toLowerCase();
      let commandfile;

    if(cmd === "hello") {
      let {channel} = message.member.voice;

      if (!channel) {
          message.channel.send('Hola, soy lionel messi')
      } else {
          let connection = await channel.join();
          let dispatcher = connection.play('./hello.mp3');

          dispatcher.on('finish', async () => {
              setTimeout(function(){ channel.leave(); }, 5000);
          });
      }
    } else {

      if (client.commands.has(cmd)) {
          commandfile = client.commands.get(cmd);
      } else if (client.aliases.has(cmd)) {
          commandfile = client.commands.get(client.aliases.get(cmd));
      }
      if (!message.content.startsWith(prefix)) return;
      try {
          commandfile.run(client, message, args);
      } catch (e) {
          console.log(e);
      }
    }
});


// =============== End ===============
client.login(process.env.token);
