

const Discord = require("discord.js");
const Client = require('discord.js')
const client = new Discord.Client({intents: 32767,});
const config = require("./config.json")
const creditos = require("./CREDITS.json")
const db = require("quick.db")
const mysql = require('mysql'); 
module.exports = client;
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.config = require("./config.json");
require("./handler")(client);
client.login(client.config.token);
const player = require("./client/player");

 var pausar = new Discord.MessageButton().setCustomId("p").setLabel("Pausar").setStyle("DANGER")
var despausar = new Discord.MessageButton().setCustomId("dp").setLabel("Despausar").setStyle("SUCCESS")
var skip = new Discord.MessageButton().setCustomId("s").setLabel("Skip").setStyle("SUCCESS")
var Queue = new Discord.MessageButton().setCustomId("q").setLabel("Queue").setStyle("SUCCESS")
client.on('interactionCreate', async(interaction) => {

    if (interaction.isButton()) {
        
        if (interaction.customId.startsWith('p')) {
            const queue = player.getQueue(interaction.guildId);

            queue.setPaused(true);
    
            return interaction.reply({ content: `${interaction.user} Pausou a musica!` });
        }
        if (interaction.customId.startsWith('dp')) {
            const queue = player.getQueue(interaction.guildId);

            queue.setPaused(false);
    
        
    
            return interaction.reply({ content: `${interaction.user} Despausou a musica!` });
        }
        if (interaction.customId.startsWith('s')) {
            const queue = player.getQueue(interaction.guildId);
            if (!queue?.playing)
                return interaction.reply({
                    content: "Não há musicas no momento!",
                    ephemeral: true
                });
    
            await queue.skip();
    

    
            return interaction.reply({ content: `${interaction.user} Skipou a musica!` });
        }
        if (interaction.customId.startsWith('q')) {
            const queue = player.getQueue(interaction.guildId);
            if (!queue?.playing)
                return interaction.reply({
                    content: "Não há musicas no momento!",
                    ephemeral: true
                });
    
            const currentTrack = queue.current;
            const tracks = queue.tracks.slice(0, 10).map((m, i) => {
                return `${i + 1}. [**${m.title}**](${m.url}) - ${
                    m.requestedBy.tag
                }`;
            });
    
            return interaction.reply({
                embeds: [
                    {
                        title: "Queue",
                        description: `${tracks.join("\n")}${
                            queue.tracks.length > tracks.length
                                ? `\n...${
                                      queue.tracks.length - tracks.length === 1
                                          ? `${
                                                queue.tracks.length - tracks.length
                                            } `
                                          : `${
                                                queue.tracks.length - tracks.length
                                            } `
                                  }`
                                : ""
                        }`,
                        color: config.embed,
                        fields: [
                            {
                                name: "Está tocando:",
                                value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
                            },
                        ],
                    },
                ],
            });
  
        }
        }
})

