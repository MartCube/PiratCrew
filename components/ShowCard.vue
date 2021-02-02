<template>
	<n-link :to="link" class="show_card" :class="{ reverse: reverse }">
		<div class="image">
			<ImageItem :src="event.data.main_image.url" :alt="title" :width="'500'" :height="'350'" />
			<div class="box"></div>
		</div>
		<div class="text">
			<h2>{{ title }}</h2>
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
	computed: {
		title() {
			return this.$prismic.asText(this.event.data.title)
		},
	},
	created() {
		this.link = this.$prismic.linkResolver(this.event)
	},
}
</script>

<style lang="scss" scoped>
.show_card {
	display: flex;
	justify-content: flex-start;
	justify-content: space-around;
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

		width: 500px;
		align-self: stretch;

		text-align: right;
		h2 {
			font-size: 2.75em;
			margin-bottom: 1.5rem;
			text-transform: uppercase;
		}
	}

	.image {
		max-width: 500px;
		width: 100%;
		height: 350px;
		display: flex;
		justify-content: center;
		position: relative;

		.box {
			z-index: 1;
			position: absolute;
			bottom: -20px;
			right: -20px;

			width: 100%;
			height: 100%;
			border: 2px solid white;
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

@media (max-width: 800px) {
	.show_card {
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
			margin-top: 3rem;
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
				line-height: 2rem;
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
