<template>
	<div class="container">
		<div v-if="$fetchState.error" class="error">
			<p>{{ $fetchState.error }}</p>
		</div>
		<div v-if="$fetchState.pending" class="loading">
			<p>loading..</p>
		</div>
		<div v-if="!$fetchState.error && !$fetchState.pending" class="wrapper">
			<Intro />

			<section id="event">
				<div class="title">
					<h2>{{ event.title }}</h2>
				</div>
				<div class="text">
					<p v-for="(slice, index) in event.text_slices" :key="'slice-' + index">
						{{ $prismic.asText(slice.primary.text) }}
					</p>
				</div>
			</section>

			<Gallery :data="event.gallery" />

			<Contact />
		</div>
	</div>
</template>

<script>
export default {
	middleware: 'navigation',
	async fetch() {
		const event = await this.$prismic.api.getByUID('project', this.$route.params.event_uid)
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
.wrapper {
	width: 100%;
	min-height: 100vh;
	margin: 40px 0 0;
	background-color: black;
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	#event {
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
				background: white;
			}
		}
		.text {
			display: flex;
			flex-direction: column;
			margin-bottom: 3rem;
			max-width: 800px;
			p {
				margin: 10px 0;
				font-size: 1.2rem;
				line-height: 1.8rem;
			}
		}
	}
}

@media (max-width: 700px) {
	.wrapper #event {
		.title {
			.back {
				margin-right: 1rem;
				font-size: 0.8rem;
			}
			h2 {
				font-size: 2rem;
			}
		}
	}
}
</style>
