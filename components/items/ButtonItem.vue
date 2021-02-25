<template>
	<button>
		<slot>slot</slot>
	</button>
</template>

<style lang="scss" scoped>
button {
	width: 100%;
	height: 50px;
	padding: 10px 0;

	color: white;
	border: 1px solid white;
	background: transparent;
	cursor: pointer;
	outline: none;

	font-family: 'codec_bold';
	letter-spacing: 2px;
	font-size: 1em;
	text-transform: uppercase;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
}
</style>
