const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// const data = {
// 	to: 'martingjorceski@gmail.com',
// 	from: process.env.DOMAIN, // Change to your verified sender
// 	subject: 'subject',
// 	text: 'text',
// }

exports.handler = async (event, context, callback) => {
	const form = JSON.parse(event.body)
	const data = {
		to: process.env.DOMAIN,
		from: form.email, // Change to your verified sender
		subject: form.subject,
		text: form.message,
	}
	let response

	try {
		response = await sgMail.send(data)
	} catch (error) {
		return {
			statusCode: error.statusCode || 500,
			body: JSON.stringify({
				error: error.message,
			}),
		}
	}
	return {
		statusCode: 200,
		body: JSON.stringify({
			result: response.message,
		}),
	}
}
