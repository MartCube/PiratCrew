// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

exports.handler = async (event, context, callback) => {
	try {
		const subject = (await event.queryStringParameters.name) || 'World'
		return {
			statusCode: 200,
			body: JSON.stringify({ message: `Hello ${subject}${event}` }),
			// // more keys you can return:
			// headers: { "headerName": "headerValue", ... },
			// isBase64Encoded: true,
		}
	} catch (err) {
		return { statusCode: 500, body: err.toString() }
	}
}
