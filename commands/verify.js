exports.run = (client, message, Keyv, config) => {
	const discord_email = new Keyv(CONFIG.DATABASE_URL, { namespace: 'discord_email' })
	const code_email_temp = new Keyv(CONFIG.DATABASE_URL, { namespace: 'code_email_temp' })
	const code_discord_temp = new Keyv(CONFIG.DATABASE_URL, { namespace: 'code_discord_temp' })
	const ALPHANUM = '0123456789'
	
	code_discord_temp.clear()
	code_email_temp.clear()



}
