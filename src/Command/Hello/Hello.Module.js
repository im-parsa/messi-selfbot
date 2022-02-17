const Path = require('path');

module.exports.run = async (Client, Interaction) =>
{
    try
    {
        const { channel } = Interaction.member.voice;

        if (!channel)
        {
            Interaction.channel.send('Hola, soy lionel messi')
        }
        else
        {
            const Connection = await channel.join();
            const Dispatcher = Connection.play(Path.resolve('src', 'Asset', 'Hello.mp3'));

            Dispatcher.on('finish', async () =>
            {
                setTimeout(() => channel.leave(), 5000);
            });
        }
    }
    catch (Error)
    {
        console.error(Error);

        await Interaction.channel.send(`Some thing is wrong.`);
    }
};

module.exports.help =
    {
        name: 'hello',
        aliases: [ 'hi', 'hola' ]
    };