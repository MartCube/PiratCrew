<template>
	<section id="shows">
		<TextBox :text="$t('pages.shows')" />
		<div v-if="!$fetchState.pending" class="shows">
			<ShowCard v-for="(event, i) in events" :key="i" :event="event" :reverse="i % 2 == 0 ? true : false" />
		</div>
	</section>
</template>

<script>
export default {
	async fetch() {
		const events = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'show'))
		this.events = events.results
	},
	data: () => ({
		events: [Object],
	}),
}
</script>

<style lang="scss" scoped>
.shows {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}

@media (max-width: 600px) {
	.shows {
		margin-top: 2rem;
	}
}
</style>
