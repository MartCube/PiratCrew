<template>
	<div class="event" :class="{ reverse: reverse }">
		<ImageItem :image-src="event.data.main_image.url" image-alt="main_image" />
		<div class="text">
			<h2>{{ $prismic.asText(event.data.title) }}</h2>
			<p>{{ $prismic.asText(event.data.text) }}</p>
			<n-link :to="link">see more</n-link>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		event: {
			type: Object,
			required: true,
		},
		reverse: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		link: '',
	}),
	created() {
		this.link = this.$prismic.linkResolver(this.event)
	},
}
</script>

<style lang="scss" scoped>
.event {
	display: flex;
	justify-content: flex-start;
	align-items: center;

	width: 100%;
	margin-bottom: 5%;
	.text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		align-content: flex-end;

		width: fit-content;
		align-self: stretch;
		margin: 0 10%;

		text-align: right;
		h2 {
			font-size: 2.75em;
			margin-bottom: 1.5rem;
			text-transform: uppercase;
		}
		a {
			margin: 10px 0;

			font-family: 'codec_bold';
			font-size: 1.2em;
			text-transform: uppercase;
			text-decoration: none;
			color: white;
			transition: 0.3s ease;
			&:hover {
				opacity: 0.5;
				transform: translateX(10px);
			}
		}
	}

	&.reverse {
		align-self: flex-end;
		flex-direction: row-reverse;
		.text {
			align-items: flex-start;
			align-content: flex-start;
			text-align: left;
		}
	}
}

@media (max-width: 600px) {
}
</style>
