const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('countdown')
		.setDescription('Starts a Countdowntimer!')
		.addIntegerOption(option =>
			option.setName('time')
				.setDescription('The different times')
				.setRequired(true)
				.addChoices(
					{ name: '10 seconds', value: 10 },
					{ name: '5 seconds', value: 5 },
				)),
	async execute(interaction) {

		const selectedTime = interaction.options.getInteger('time')

		if (selectedTime === 10) {
			for (let i = selectedTime; i > 0; i--) {
				if (selectedTime === i){
					await interaction.reply({content:selectedTime.toString(), tts:true, fetchReply:true})
						.then(msg => {
							setTimeout(() => msg.delete(), 6500)
						})
						.catch()

				} else {
					await interaction.followUp({content:i.toString(), tts:true, fetchReply:true})
						.then(msg => {
							setTimeout(() => msg.delete(), 20000)
						})
						.catch()

				}
			}

		}
		else if (selectedTime === 5) {
			for (let i = selectedTime; i > 0; i--) {
				if (selectedTime === i){
					await interaction.reply({content:selectedTime.toString(), tts:true, fetchReply:true})
						.then(msg => {
							setTimeout(() => msg.delete(), 5500)
						})
						.catch()

				} else {
					await interaction.followUp({content:i.toString(), tts:true, fetchReply:true})
						.then(msg => {
							setTimeout(() => msg.delete(), 12000)
						})
						.catch()

				}
			}

		}

		await interaction.followUp({content:'go', tts:true, fetchReply:true})
			.then(msg => {
				setTimeout(() => msg.delete(), 25000)
			})
			.catch()

	},

};
