<template>
	<div class="letters">
		<template v-if="currSvg">
			<div v-html="currSvg"></div>
		</template>
		<div class="scroll">
			<div class="text">
				<span>scroll</span>
			</div>
			<div class="line"></div>
		</div>
	</div>
</template>

<script setup>
import { lettersAnim } from '@/assets/anime'
import { EventNames } from '@/types/eventNames'
import {PIRATECREW, JAZZDOIT, BONVOYAGE, CIRCUSARTHOTEL, TESTEVENT} from '@/types/svgConstants'

const props = defineProps(['text'])

// SVG mapping for better performance and cleaner code
const svgMap = {
	[EventNames.PIRATECREW]: PIRATECREW,
	[EventNames.JAZZDOIT]: JAZZDOIT,
	[EventNames.BONVOYAGE]: BONVOYAGE,
	[EventNames.CIRCUSARTHOTEL]: CIRCUSARTHOTEL,
	[EventNames.TESTEVENT]: TESTEVENT,
}

const currSvg = computed(() => {
	return svgMap[props.text] || PIRATECREW
})

const useLettersAnimation = () => {
	const animate = () => {
		nextTick(() => {
			const letters = document.querySelectorAll('.letters svg path')
			const lineScroll = document.querySelector('.letters .scroll .line')
			const textScroll = document.querySelector('.letters .scroll .text span')

			if (letters.length > 0 && lineScroll && textScroll) {
				lettersAnim(letters, lineScroll, textScroll)
			}
		})
	}
	return { animate }
}

const { animate } = useLettersAnimation()

onMounted(() => animate())

</script>

<style lang="scss" scoped>
.letters {
	width: calc(100vw - 80px);
	height: calc(100vh - 80px);
	z-index: 1;
	background-color: rgba($color: #000000, $alpha: 0.5);
	cursor: pointer;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	.scroll {
		position: absolute;
		left: 50%;
		bottom: 0;
		// anime to translateY(0);
		transform: translate(-50%, -100%);

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.text {
			text-transform: uppercase;
			// writing-mode: vertical-rl;
			text-orientation: mixed;
			font-size: 14px;
			overflow: hidden;
			top: -17px;
    	position: relative;
			span {
				// animate opacity: 1;
				opacity: 0;
				display: block;
			}
		}
		.line {
			position: absolute;
			width: 2px;
			background: white;
			// animate height: 200%;
			height: 0%;
			top: 0;
		}
	}

	svg {
		width: 100%;
		height: 320px;

		fill: none;
		stroke: white;
		stroke-width: 2px;
		stroke-miterlimit: 10;
		path {
			opacity: 0;
		}
	}

	// Styles for SVG inserted via v-html
	:deep(svg) {
		width: 100%;
		height: 320px;
		fill: none;
		stroke: white;
		stroke-width: 2px;
		stroke-miterlimit: 10;

		path {
			opacity: 0;
		}
	}
}
</style>
