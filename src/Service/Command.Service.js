const FS = require('fs');
const Path = require('path');

module.exports.HandleCommands = async (Client, CommandsFolders) =>
{
    for (const CommandFolders of CommandsFolders)
    {
        FS.readdir(Path.resolve('src', 'Command', CommandFolders), (Error, FsFiles) =>
        {
            if (Error)
            {
                return console.log(Error);
            }

            const Files = FsFiles.filter(f => f.split(".").pop() === "js");

            if (Files.length <= 0)
            {
                return console.log("Couldn't find Command.");
            }

            Files.forEach((FsFile) =>
            {
                const File = require(`../Command/${CommandFolders}/${FsFile}`);

                Client.Commands.set(File.help.name, File);

                File.help.aliases.forEach(alias =>
                {
                    Client.Aliases.set(alias, File.help.name);
                });
            });
        })
    }
};
