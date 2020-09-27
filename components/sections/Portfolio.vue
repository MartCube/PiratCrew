<template>
	<section id="portfolio">
		<TextBox text="portfolio" />
		<div v-if="!$fetchState.pending" class="portfolio">
			<Event v-for="(event, i) in events" :key="i" :event="event" :reverse="i % 2 == 0 ? true : false" />
		</div>
	</section>
</template>

<script>
export default {
	async fetch() {
		const events = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'project'), { orderings: '[document.first_publication_date desc]' })
		this.events = events.results
		// console.log(this.events)
	},
	data: () => ({
		events: [Object],
	}),
}
</script>

<style lang="scss" scoped>
.portfolio {
	width: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}

@media (max-width: 600px) {
}
</style>
