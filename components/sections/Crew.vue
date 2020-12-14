<template>
	<section id="crew">
		<TextBox :text="$t('pages.crew')" />

		<div class="crew">
			<Artist v-for="artist in crew" :key="artist.primary.image.alt" :image="artist.primary.image.url" :name="artist.primary.image.alt" />
		</div>
	</section>
</template>

<script>
export default {
	async fetch() {
		const crew = await this.$prismic.api.getSingle('artists')
		this.crew = crew.data.body
	},
	data: () => ({
		crew: Array,
	}),
}
</script>

<style lang="scss" scoped>
.crew {
	display: flex;
	flex-wrap: wrap;

	align-items: center;
	justify-content: center;
}

@media (max-width: 940px) {
	.crew {
		justify-content: space-evenly;
	}
}
</style>
