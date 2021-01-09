<template>
	<section id="events">
		<TextBox :text="$t('pages.events')" />
	</section>
</template>

<script>
export default {
	async fetch() {
		const events = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'project'), { orderings: '[document.first_publication_date desc]' })
		this.events = events.results
	},
	data: () => ({
		events: [Object],
	}),
}
</script>

<style lang="scss" scoped>
.events {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}

@media (max-width: 600px) {
	.events {
		margin-top: 2rem;
	}
}
</style>
