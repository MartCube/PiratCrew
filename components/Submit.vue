<template>
	<button type="submit" class="submit">
		<span v-if="!loading">submit<i class="icon icon-mail" /></span>
		<spinner v-else />
	</button>
</template>

<script>
export default {
	data: () => ({
		loading: false,
	}),
}
</script>

<style lang="scss" scoped>
.submit {
	width: 100%;
	height: 50px;
	margin-top: 50px;
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
