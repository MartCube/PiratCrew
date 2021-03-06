export default function (doc) {
	// Return the path depending on Prismic Document's type

	// If it is a Repeatable Custom Type with the API ID
	if (doc.type === 'show') {
		return '/shows/' + doc.uid
	}

	// Default to the root
	return '/not-found'
}
