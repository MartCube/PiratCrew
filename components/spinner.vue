<template>
	<div class="spinner" :class="theme">
		<div class="bounce1"></div>
		<div class="bounce2"></div>
		<div class="bounce3"></div>
	</div>
</template>

<script>
export default {
	computed: {
		theme() {
			return this.$store.getters.theme
		},
	},
}
</script>

<style scoped>
.spinner {
	align-self: center;
}
.spinner > div {
	width: 6px;
	height: 6px;
	margin: 0 2px;
	background-color: #f2f2f2;
	border-radius: 100%;
	display: inline-block;
	-webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
	animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}
.spinner.white > div {
	background-color: #080808;
}
.spinner .bounce1 {
	-webkit-animation-delay: -0.32s;
	animation-delay: -0.32s;
}
.spinner .bounce2 {
	-webkit-animation-delay: -0.16s;
	animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
	0%,
	80%,
	100% {
		-webkit-transform: scale(0);
	}
	40% {
		-webkit-transform: scale(1);
	}
}
@keyframes sk-bouncedelay {
	0%,
	80%,
	100% {
		-webkit-transform: scale(0);
		transform: scale(0);
	}
	40% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}
}
</style>
