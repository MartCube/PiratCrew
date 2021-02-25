<template>
	<div class="artist">
		<img :src="image" :alt="name" />
		<div class="overlay"></div>
		<span class="name">{{ name }}</span>
	</div>
</template>

<script>
export default {
	props: {
		image: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	data: () => ({}),
}
</script>

<style lang="scss" scoped>
.artist {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-basis: 30%;

	margin: 4rem 0;
	position: relative;
	user-select: none;

	img {
		width: 250px;
	}
	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		opacity: 0;
		transition: all 0.35s ease;
	}
	span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		text-transform: uppercase;
		letter-spacing: 0.25rem;
		opacity: 0;
		transition: all 0.35s ease;
	}

	&:hover {
		.overlay,
		.name {
			opacity: 1;
		}
	}
}
</style>
