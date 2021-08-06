<template>
	<div>
		<div class="container">
			<template v-if="$fetchState.error">
				<Error />
			</template>
			<template v-if="$fetchState.pending">
				<!-- loading animation -->
			</template>
			<template v-else>
				<Intro :video="event.video" />

				<section id="show">
					<div class="title">
						<h2>{{ event.title }}</h2>
					</div>
					<div class="text">
						<p v-for="(slice, index) in event.text_slices" :key="'slice-' + index">
							{{ $prismic.asText(slice.primary.text) }}
						</p>
					</div>
					<Gallery :data="event.gallery" />
				</section>

				<Contact />
			</template>
		</div>
	</div>
</template>

<script>
export default {
	middleware: 'navigation',
	async fetch() {
		const event = await this.$prismic.api.getByUID('show', this.$route.params.show_uid)
		this.event = {
			main_image: event.data.main_image.url,
			title: this.$prismic.asText(event.data.title),
			video: this.$prismic.asText(event.data.video),
			text_slices: event.data.body,
			gallery: event.data.gallery,
		}
	},
	data: () => ({
		event: Object,
	}),
}
</script>

<style lang="scss" scoped>
#show {
	width: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	.title {
		width: 100%;
		max-width: 800px;
		margin: 3rem 0;
		padding-left: 1rem;

		text-transform: uppercase;
		font-size: 2rem;
		position: relative;

		&::before {
			content: '';
			display: flex;
			height: 100%;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 2px;
			background: white;
		}
	}
	.text {
		display: flex;
		flex-direction: column;
		max-width: 800px;
		p {
			margin: 10px 0;
			font-size: 1.2rem;
			line-height: 1.8rem;
		}
	}
}

@media (max-width: 700px) {
	#show {
		.title h2 {
			font-size: 2rem;
		}
		.text p {
			font-size: 1rem;
		}
	}
}
</style>
