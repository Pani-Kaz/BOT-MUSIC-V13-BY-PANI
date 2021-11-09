const client = require("../index");
const config = require("../config.json")
const creditos = require("../CREDITS.json")
const Discord = require("discord.js")
client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {

        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
       
 const { owners } = require("../config.json");
 if (cmd) {
  if (cmd.ownerOnly) {
 if (!owners.includes(interaction.user.id)) {
 let ownerOnly = new Discord.MessageEmbed()
  .setDescription( "*Somente meu dono pode usar isso!*" )
  .setColor(config.embed)
  .setFooter("By: Pani Kaz#8893 ")
  return interaction.followUp({embeds : [ownerOnly] });
 }}
 }
        if (!cmd)
            return interaction.followUp({ content: "Ixi, muitos erro poucas soluções" });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
   

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
        
    }
});
