module.exports =
    {
        name: 'ready',

        async execute(Client)
        {
            Client.user.setPresence(
                {
                    status: 'dnd',
                    activity:
                        {
                            name: 'Football ⚽',
                            type: 'WATCHING',
                        },
                });

            console.info(`Bot is Logged in as ${ Client.user.tag }!`);
        }
    };
