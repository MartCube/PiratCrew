<template>
	<div class="container">
		<template v-if="$fetchState.error">
			<Error />
		</template>
		<template v-else-if="$fetchState.pending">
			<!-- loading animation -->
			loading
		</template>
		<template v-else>
			<Intro :video="event.bg" @click.native="OpenModal" />
			<Modal :video="event.video" />

			<section id="show">
				<h2 class="title">{{ event.title }}</h2>
				<prismic-rich-text class="description rich_text" :field="event.description" />
			</section>
			<Gallery :data="event.gallery" />

			<Contact />
		</template>
	</div>
</template>

<script>
export default {
	middleware: 'navigation',
	async fetch() {
		const event = await this.$prismic.api.getByUID('show', this.$route.params.show_uid)
		this.event = {
			bg: event.data.main_image.alt,
			title: event.data.title,
			video: event.data.video,
			description: event.data.description,
			gallery: event.data.gallery,
		}
	},
	data: () => ({
		event: Object,
	}),
	methods: {
		OpenModal() {
			this.$store.dispatch('bindModal', true)
		},
	},
}
</script>

<style lang="scss" scoped>
#show {
	width: 100%;

	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	.title {
		width: 100%;
		height: 2rem;
		margin: 3rem 0;
		padding-left: 1rem;

		text-transform: uppercase;
		font-size: 2rem;
		position: relative;

		display: flex;
		align-items: center;

		&::before {
			content: '';
			height: 100%;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 2px;
			background: white;
		}
	}
	.description {
		display: flex;
		flex-direction: column;
		width: 60%;
	}
}

@media (max-width: 700px) {
	#show {
		.title h2 {
			font-size: 2rem;
		}
		.description {
			width: 100%;
		}
	}
}
</style>
