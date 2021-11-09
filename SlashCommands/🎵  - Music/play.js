const { QueryType } = require("discord-player");
const Discord = require("discord.js");
const pani_cc = require("../../client/player");
const config = require("../../config.json")


module.exports = {
    name: "play",
    description: "Começe musicas",
    options: [
        {
            name: "musica",
            description: "Nome ou link da musica",
            type: "STRING",
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const pani_music = interaction.options.getString("musica");

        if (!interaction.member.voice.channel)
            return interaction.followUp({
                content: "Entre em um canal!",
            });

        const searchResult = await pani_cc.search(pani_music, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        const queue = await pani_cc.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });

        if (!queue.connection)
        searchResult.playlist
        ? queue.addTracks(searchResult.tracks)

        : queue.addTrack(searchResult.tracks[0]);
            await queue.connect(interaction.member.voice.channel);
            var pausar = new Discord.MessageButton().setCustomId("p").setLabel("Pausar").setStyle("DANGER")
            var despausar = new Discord.MessageButton().setCustomId("dp").setLabel("Despausar").setStyle("SUCCESS")
            var skip = new Discord.MessageButton().setCustomId("s").setLabel("Skip").setStyle("SUCCESS")
            var Queue = new Discord.MessageButton().setCustomId("q").setLabel("Queue").setStyle("SUCCESS")
            const row = new Discord.MessageActionRow().addComponents(pausar, despausar, skip, Queue)
            const embed = new Discord.MessageEmbed()

            .setAuthor(`Painel`)
            .setDescription("Sistemas de musica by: Pani Kaz#8893")
       
            .setColor(config.embed)
            .setFooter("By: Pani Kaz#8893 ")
    
            interaction.channel.send({embeds: [embed], components: [row]})
        interaction.followUp({ content: `Djzin ${client.user.username} on!` });
      
   
     

         

        if (!queue.playing) await queue.play();
    },
};