const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('decide')
        .setDescription('Pick one of the given options, seperate options with space')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('the input to echo back')
                .setRequired(true)),
    async execute(interaction) {

        const userInput = interaction.options.getString('input')
        const options = userInput.split(" ")

        const randNum = Math.floor(Math.random() * options.length)
        console.log(options)
        console.log(randNum)

        const decided = options[randNum]
        console.log(decided)

        return interaction.reply(decided + " is the winner between: " + userInput)
    }
}
