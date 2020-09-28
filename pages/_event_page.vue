<template>
	<div class="container">
		<div v-if="$fetchState.error" class="error">
			<p>{{ $fetchState.error }}</p>
		</div>
		<div v-if="$fetchState.pending" class="loading">
			<p>loading..</p>
		</div>
		<div v-if="!$fetchState.error && !$fetchState.pending" class="event">
			<ImageItem :image-src="event.main_image" :image-alt="event.title" />
			<div class="title">
				<h2>{{ event.title }}</h2>
			</div>
			<div class="text">
				{{ event.text }}
			</div>

			<Gallery :data="event.gallery" />

			<div class="video">video</div>
		</div>
	</div>
</template>

<script>
export default {
	async fetch() {
		const event = await this.$prismic.api.getByUID('project', this.$route.params.event_page)
		this.event = {
			main_image: event.data.main_image.url,
			title: this.$prismic.asText(event.data.title),
			text: this.$prismic.asText(event.data.text),
			gallery: event.data.gallery,
		}

		console.log(event)
	},
	data: () => ({
		event: Object,
	}),
}
</script>

<style lang="scss" scoped>
.event {
	max-width: 800px;
	width: 100%;
	min-height: 100vh;
	margin: 5% 0;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;

	.image {
		max-width: 100%;
	}
	h2 {
		margin: 30px 0;
		font-size: 2.75em;
	}
	.text {
		margin: 30px 0;
	}
}
@media (max-width: 600px) {
}
</style>
