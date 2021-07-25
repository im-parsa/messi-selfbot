const axios = require('axios');

module.exports.run = async (client, message, args) => {

    try {
        
        if (args[0].includes("http")) {

            message.channel.send(`Please just give me the f%*#cking INVITE_CODE.`)
            
        } else {
            const data = '';

            const config = {
                method: 'post',
                url: `https://discordapp.com/api/v6/invites/${args[0]}`,
                headers: {
                    'Authorization': process.env.token,
                    'Cookie': '__dcfduid=eb512138ff894201bb227ad3b570e4e1'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    let result = response.data;
                    message.channel.send(`I joined the **${result.guild.name} (${result.guild.id})** server.`)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        

    } catch (e) {
        console.log(e);
        
        message.channel.send(`This INVITE_CODE is wrong.`)

    }
    

};
module.exports.help = {
  name: "join",
  aliases: ["invite"]
};