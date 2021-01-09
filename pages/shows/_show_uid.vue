<template>
	<div>
		<Intro />

		<div class="container">
			<template v-if="$fetchState.error" class="error">
				<Error />
			</template>
			<template v-if="$fetchState.pending" class="loading">
				<p>loading..</p>
			</template>
			<template v-if="!$fetchState.error && !$fetchState.pending">
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
		const event = await this.$prismic.api.getByUID('project', this.$route.params.show_uid)
		this.event = {
			main_image: event.data.main_image.url,
			title: this.$prismic.asText(event.data.title),
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
	align-items: center;
	.title {
		width: 100%;
		max-width: 800px;
		margin: 3rem 0;
		padding-left: 1rem;
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
			background: #f2f2f2;
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
