<template>
	<section id="shows">
		<TextBox :text="$t('pages.shows.name')" />
		<div v-if="!$fetchState.pending" class="shows">
			<ShowCard v-for="(event, i) in events" :key="i" :event="event" :reverse="i % 2 == 0 ? true : false" />
		</div>
		<div v-if="$fetchState.error" class="error">
			<h2>Упс что-то пошло не так, перезагрузите страницу пожалуйста</h2>
		</div>
	</section>
</template>

<script>
export default {
	async fetch() {
		await this.$prismic.api
			.query(this.$prismic.predicates.at('document.type', 'show'))
			.then((data) => {
				this.events = data.results
			})
			.catch((err) => {
				console.error(err)
			})
	},
	fetchKey: 'shows',
	data: () => ({
		events: {},
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
</style>
