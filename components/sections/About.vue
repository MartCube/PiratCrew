<template>
	<section id="about">
		<TextBox :text="t('pages.about')" />
		<div class="about">
			<div class="text">
				<div class="wrap">
					<p>{{ t('aboutPage.paragraph1') }}</p>
					<p>{{ t('aboutPage.paragraph2') }}</p>
					<p>{{ t('aboutPage.paragraph3') }}</p>
				</div>
				<div class="wrap">
					<p>{{ t('aboutPage.paragraph4') }}</p>
					<p>{{ t('aboutPage.paragraph5') }}</p>
					<p>{{ t('aboutPage.paragraph6') }}</p>
					<p>{{ t('aboutPage.welcome') }}</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.about {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;

	.piratcrew {
		width: 100%;
		position: relative;

		img {
			width: inherit;
		}
		.letters {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 2;
		}
	}
	.text {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		.wrap {
			width: 45%;
			p {
				margin: 1.8rem 0;
				font-size: 1.2rem;
				line-height: 1.8rem;
				&:first-child {
					margin-top: 0;
				}
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
}

@media (max-width: 800px) {
	.about .text {
		flex-direction: column;
		.wrap {
			width: 100%;
			p {
				font-size: 1rem;
			}
		}
	}
}
@media (max-width: 600px) {
}
</style>
