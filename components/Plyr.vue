<template>
	<client-only>
		<vue-plyr ref="plyr">
			<video autoplay muted crossorigin playsinline>
				<source size="576" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4" />
				<source size="720" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4" type="video/mp4" />
				<source size="1080" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4" type="video/mp4" />
			</video>
		</vue-plyr>
	</client-only>
</template>

<style lang="scss" scoped>
.plyr--video .plyr__controls,
.plyr--full-ui.plyr--video .plyr__control--overlaid {
	display: none !important;
}

.plyr--video {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100vw;
	height: 100vh;
	transform: translate(-50%, -50%);
	object-fit: cover;
	z-index: 0;
}
video {
	object-fit: cover;
}
</style>
