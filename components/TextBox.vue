<template>
	<!-- @click="textAnim" -->
	<div class="text_box">
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
	},
	mounted() {
		textAnim(this.$refs.text, this.$refs.box)
	},
	methods: {
		textAnim() {
			textAnim(this.$refs.text, this.$refs.box)
		},
	},
}
</script>

<style lang="scss" scoped>
.text_box {
	align-self: flex-start;
	position: relative;
	overflow: hidden;
	margin: 4rem 0;
	h2 {
		font-size: 5em;
		text-transform: uppercase;
		color: transparent;
		-webkit-text-stroke: 1px white;
		opacity: 0;
	}
	.box {
		position: absolute;
		top: 0;
		left: 0;
		position: absolute;
		width: 0%;
		height: 100%;
		background: white;
	}
}

@media (max-width: 600px) {
	.text_box {
		h2 {
			font-size: 3em;
		}
	}
}
</style>
