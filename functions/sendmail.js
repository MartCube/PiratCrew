const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.handler = async (event, context, callback) => {
	const form = JSON.parse(event.body)
	const data = {
		to: process.env.DOMAIN,
		from: process.env.DOMAIN,
		subject: form.subject,
		html: `<h3>${form.action} form</h3> <h4>email:</h4> <p>${form.email}</p> <h4>message:</h4> <p>${form.message}</p>`,
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
