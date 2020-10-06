import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

exports.handler = async (event, context) => {
	try {
		await sendgrid.send({
			to: 'your@email.com',
			from: 'your@email.com',
			subject: 'jamstackfns',
			text: 'Hello, world!',
		})
	} catch (error) {
		return console.log(error)
	}

	return {
		statusCode: 200,
		body: JSON.stringify({ error: '' }),
	}
}
