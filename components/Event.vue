<template>
	<n-link :to="link" class="event" :class="{ reverse: reverse }">
		<ImageItem :image-src="event.data.main_image.url" image-alt="main_image" box />
		<div class="text">
			<h2>{{ $prismic.asText(event.data.title) }}</h2>
		</div>
	</n-link>
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
	text-decoration: none;
	color: white;
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
	.event {
		align-self: flex-end;
		flex-direction: column;
		margin: 0rem 0 3rem;
		&.reverse {
			flex-direction: column;
			.text {
				h2 {
					padding: 0 1rem;
					&::before {
						right: initial;
						left: 0;
					}
				}
			}
		}
		.text {
			margin: 1.5rem 10%;
			width: auto;
			p {
				line-height: 1.2;
				display: none;
			}
			span {
				text-decoration: underline;
			}
			h2 {
				position: relative;
				font-size: 2rem;
				padding-right: 1rem;
				&::before {
					content: '';
					display: flex;
					height: 100%;
					position: absolute;
					right: 0;
					bottom: 0;
					width: 2px;
					background-color: white;
				}
			}
		}
	}
}
</style>
