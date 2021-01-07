const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.handler = async (event, context, callback) => {
	const form = JSON.parse(event.body)

	let template
	if (form.action === 'Contact') template = `<h4>email:</h4> <p>${form.email}</p> <h4>message:</h4> <p>${form.message}</p>`
	else if (form.action === 'Casting') template = `<h4>it works</h4> <p>${form.email}</p>`

	const data = {
		to: process.env.DOMAIN,
		from: process.env.DOMAIN,
		subject: form.action,
		html: template,
	}
	let response

	try {
		response = await sgMail.send(data)
		return {
			statusCode: 200,
			body: JSON.stringify({
				result: response.message,
			}),
		}
	} catch (error) {
		return {
			statusCode: error.statusCode || 500,
			body: JSON.stringify({
				error: error.message,
			}),
		}
	}
}
