<template>
	<div v-observe-visibility="visibilityOptions" class="text_box" :class="{ white: white }">
		<h2 ref="text">{{ text }}</h2>
		<div ref="box" class="box"></div>
	</div>
</template>

<script>
import { textAnim } from '~/assets/anime'

export default {
	props: {
		text: {
			type: String,
			required: true,
		},
		white: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		visibilityOptions() {
			return {
				callback: this.visibilityChanged,
				once: true,
				intersection: {
					threshold: 1,
				},
			}
		},
	},
	methods: {
		visibilityChanged(isVisible) {
			if (isVisible) {
				textAnim(this.$refs.text, this.$refs.box)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.text_box {
	height: 60px;
	align-self: flex-start;
	position: relative;
	overflow: hidden;
	margin: 4rem 0;
	user-select: none;
	h2 {
		font-weight: 500;
		font-size: 5rem;
		line-height: 60px;
		text-transform: uppercase;
		color: white;
		// -webkit-text-stroke: 2px white;

		margin-left: 2rem;
		opacity: 0;
	}
	.box {
		position: absolute;
		top: 0;
		right: 0;
		position: absolute;
		width: 0%;
		height: 100%;
		background: white;
	}

	&.white {
		h2 {
			-webkit-text-stroke: 2px black;
		}
		.box {
			background: black;
		}
	}
}

@media (max-width: 800px) {
	.text_box {
		h2 {
			font-size: 2.5rem;
			-webkit-text-stroke: 1px white;
		}
	}
}
</style>
