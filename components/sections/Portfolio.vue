<template>
	<section id="portfolio">
		<div class="title">
			<TextBox text="portfolio" white />
		</div>
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
	},
	data: () => ({
		events: [Object],
	}),
}
</script>

<style lang="scss" scoped>
#portfolio {
	background-color: #fff;
	color: #000;
	.title {
		justify-content: flex-start;
		display: flex;
		width: -webkit-fill-available;
		padding: 0 3rem;
		margin: 0;
		position: relative;
		&::before {
			content: '';
			display: flex;
			position: absolute;
			background-color: #000;
			z-index: 1;
			left: 0;
			width: 1vw;
			top: 34%;
			height: 3.5rem;
		}
	}
}
.portfolio {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}

@media (max-width: 600px) {
	.portfolio {
		margin-top: 2rem;
	}
}
</style>
