<template>
	<client-only>
		<div class="plyr_video">
			<vue-plyr>
				<!-- <div data-plyr-provider="vimeo" :data-plyr-embed-id="video"></div> -->
				<div data-plyr-provider="youtube" allowfullscreen allowtransparency allow="autoplay" :data-plyr-embed-id="video"></div>
			</vue-plyr>
		</div>
	</client-only>
</template>

<script>
export default {
	props: {
		video: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="scss">
.plyr_video {
	width: 60%;
	min-height: max-content;
}
:root {
	--plyr-color-main: black;
}
@media (max-width: 900px) {
	.plyr_video {
		width: 100%;
	}
}
</style>
