module.exports =
    {
        name: 'message',

        async execute(Interaction, Client)
        {
            const Args = Interaction.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
            const CommandName = Args.shift().toLowerCase();

            let CommandFile;

            if (Client.Commands.has(CommandName))
            {
                CommandFile = Client.Commands.get(CommandName);
            }
            else if (Client.Aliases.has(CommandName))
            {
                CommandFile = Client.Commands.get(Client.Aliases.get(CommandName));
            }

            if (!Interaction.content.startsWith(process.env.PREFIX))
            {
                return;
            }

            try
            {
                CommandFile.run(Client, Interaction, Args);
            }
            catch (Error)
            {
                console.error(Error);
            }
        }
    };
