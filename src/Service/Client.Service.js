const FS = require('fs');
const Path = require('path');
const Discord = require('discord.js-self');
const { HandleEvents } = require('./Event.Service');
const { HandleCommands } = require('./Command.Service');

class ClientService
{
    constructor()
    {
        this.client = new Discord.Client();

        this.client.Aliases = new Discord.Collection();
        this.client.Commands = new Discord.Collection();
    }

    async clientLogin()
    {
        await this.client.login(process.env.TOKEN);
    }

    eventHandler()
    {
        const EventsFiles = FS.readdirSync(Path.resolve('src', 'Event')).filter((File) => File.endsWith('.Module.js'));

        HandleEvents(this.client, EventsFiles).then(() => console.info('Events loaded !'));
    }

    commandHandler()
    {
        const CommandsFolders = FS.readdirSync(Path.resolve('src', 'Command'));

        HandleCommands(this.client, CommandsFolders).then(() => console.info('Commands loaded !'));
    }

    async start()
    {
        try
        {
            await this.clientLogin().then(() =>
            {
                if (!this.client.user.bot)
                {
                    this.eventHandler();
                    this.commandHandler();
                }
            })
        }
        catch (Error)
        {
            console.error(Error);
        }
    }
}

module.exports = ClientService;