<template>
	<section id="crew">
		<TextBox :text="$t('pages.crew')" />

		<div class="grid">
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
.grid {
	display: flex;
	flex-wrap: wrap;

	align-items: center;
	justify-content: center;
}

@media (max-width: 940px) {
	.grid {
		justify-content: space-evenly;
		.artist:last-child {
			margin: 0;
		}
	}
}
</style>
