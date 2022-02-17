const Axios = require('axios');

module.exports.run = async (Client, Interaction, Args) =>
{
    try
    {
        if (Args[0].includes("http"))
        {
            Interaction.channel.send(`Please just give me the f%*#cking INVITE_CODE.`)
        }
        else
        {
            const AxiosConfig =
                {
                    method: 'post',
                    url: `https://discordapp.com/api/v9/invites/${Args[0]}`,
                    headers:
                        {
                            'Authorization': process.env.TOKEN,
                            'Cookie': '__dcfduid=eb512138ff894201bb227ad3b570e4e1'
                        }
                };

            await Axios(AxiosConfig)
                .then(async (Response) =>
                {
                    await Interaction.channel.send(`I joined the **${ Response.data.guild.name } (${ Response.data.guild.id })** server.`)
                })
                .catch((Error) =>
                {
                    console.error(Error);
                });
        }
    }
    catch (Error)
    {
        console.error(Error);

        await Interaction.channel.send(`This INVITE_CODE is wrong.`);
    }
};

module.exports.help =
    {
        name: 'join',
        aliases: [ 'invite' ]
    };