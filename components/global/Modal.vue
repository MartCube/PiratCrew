<template>
	<div v-if="modal" class="modal">
		<VideoItem :video="video" />
		<svg class="cancel" viewBox="0 0 24 24" @click="Close">
			<path d="M22,4,20,2l-8,8L4,2,2,4l8,8L2,20l2,2,8-8,8,8,2-2-8-8Z" />
		</svg>
	</div>
</template>

<script>
export default {
	props: {
		video: {
			type: String,
			required: true,
		},
	},
	computed: {
		modal() {
			return this.$store.getters.modal
		},
	},
	methods: {
		Close() {
			this.$store.dispatch('bindModal', false)
		},
	},
}
</script>

<style lang="scss">
.modal {
	position: fixed;
	width: calc(100vw - 80px);
	height: calc(100vh - 80px);
	z-index: 98;
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
