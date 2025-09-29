<template>
	<div v-if="modal" class="modal">
		<VideoItem :video="video" />
		<svg class="cancel" viewBox="0 0 24 24" @click="close">
			<path d="M22,4,20,2l-8,8L4,2,2,4l8,8L2,20l2,2,8-8,8,8,2-2-8-8Z" />
		</svg>
	</div>
</template>

<script setup>
// Пропси
const props = defineProps({
	video: {
		type: String,
		required: true,
	},
})

// Глобальний стан модального вікна
const modal = useModal()

// Метод для закриття модалки
const close = () => {
	modal.value = false
}
</script>

<style lang="scss">
.modal {
	top: 0;
	left: 0;
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 1000;
	background: black;

	display: flex;
	justify-content: center;
	align-items: center;

	.cancel {
		position: absolute;
		top: 0;
		right: 0;
		width: 40px;
		height: 35px;
		fill: white;

		cursor: pointer;
		opacity: 0.6;
		transition: all 0.2s ease;
		&:hover {
			opacity: 0.9;
		}
	}
}
</style>
