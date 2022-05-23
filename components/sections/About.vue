<template>
	<section id="about">
		<TextBox :text="$t('pages.about')" />
		<div v-if="currentLocale === 'en'" class="about">
			<div class="text">
				<div class="wrap">
					<p>Show production <b>PIRAT CREW</b> 10 years of experience creating captivating world-class shows. He is heading for new and unexplored paths on the map of modern theatrical and choreographic art. His team includes circus artists, dancers, costume designers, choreographers, directors of shows and events.</p>
					<p>Pirate Crew is a team of unique, creative and free. This is our story. PIRAT CREW's artistic journey began in 2010.</p>
					<p>Since then, we have visited 20 countries with original shows that gave delight and joy to viewers in France, Sweden, Finland, Germany, Turkey, Ukraine, Russia.</p>
				</div>
				<div class="wrap">
					<p>More than 3,000 performances, 1,000 designed and staged events, 5 full-scale shows.</p>
					<p>Jazz Do It Show, Bon Voyage, Juzeppe Hotel are highly appreciated all over the world. The shows are created under the direction of PIRAT CREW director and choreographer Dmitry Yudin and a team of interdisciplinary artists.</p>
					<p>Circus art is intertwined with music and experimental choreography, designer costumes with modern technologies, acrobatics with an expressive design. All this involves the viewer in a magical and amazing story that we tell in a new visual language.</p>
					<p>Welcome!</p>
				</div>
			</div>
		</div>
		<div v-else class="about">
			<div class="text">
				<div class="wrap">
					<p>Show production <b>PIRAT CREW</b> 10 лет создает завораживающие шоу мирового масштаба. Держит курс на новые и неизведанные пути на карте современного театрального и хореографического искусства. В его команду входят артисты циркового жанра, танцоры, художники по костюмам, хореографы, режиссеры-постановщики шоу и мероприятий.</p>
					<p>Pirate Crew – команда уникальных, креативных и свободных. Об этом – наша история. Артистическое путешествие PIRAT CREW началось в 2010 году.</p>
					<p>С тех пор мы побывали в 20 странах с авторскими шоу, которые дарили восторг и радость зрителям во Франции, Швеции, Финляндии, Германии, Турции, Украине, России.</p>
				</div>
				<div class="wrap">
					<p>Более 3000 спектаклей, 1000 разработанных и поставленных мероприятий, 5 полномасштабных шоу.</p>
					<p>Jazz Do It Show, Bon Voyage, Juzeppe Hotel высоко оценили во всем мире. Шоу создаются под руководством директора и хореографа PIRAT CREW Дмитрия Юдина и команды междисциплинарных артистов.</p>
					<p>Цирковое искусство переплетается с музыкой и экспериментальной хореографией, авторские костюмы с современными технологиями, акробатика с экспрессивным замыслом. Все это вовлекает зрителя в волшебную и удивительную историю, которую мы рассказываем на новом визуальном языке.</p>
					<p>Добро пожаловать!</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data: () => ({}),
	computed: {
		currentLocale() {
			return this.$i18n.localeProperties.code
		},
	},
}
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
