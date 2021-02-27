<template>
	<section id="about">
		<TextBox :text="$t('pages.about')" />
		<div class="about">
			<div class="text">
				<div class="wrap">
					<p>Show production <b>PIRAT CREW</b> 10 лет создает завораживающие шоу мирового масштаба. Держит курс на новые и неизведанные пути на карте современного театрального и хореографического искусства. В его команду входят артисты циркового жанра, танцоры, художники по костюмам, хореографы, режиссеры-постановщики шоу и мероприятий.</p>
					<n-link class="more" :to="localePath('about')">
						<span>{{ $t('pages.about') }}</span>
						<hr />
					</n-link>
				</div>
				<div class="box" @mouseover="cursorMove()">
					<div class="box-wrapper">
						<div class="image"></div>
					</div>
					<div class="border"></div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import {TweenMax , Power2} from "gsap";

export default {
	data: () => ({}),
	methods: {
		cursorMove() {
			const bg = document.querySelector('.about .box .image');
			const border = document.querySelector('.about .box .border');
			const breakpoint = window.matchMedia('(max-width:800px)');
			let box = document.querySelector('.about .box');

			if (!breakpoint.matches) {
				let rect = box.getBoundingClientRect();

				let request = null;
				let mouse = {
					x: 0,
					y: 0
				};

				box.addEventListener("mousemove", (e) => {
					let event = e;

					mouse.x = event.pageX;
					mouse.y = event.pageY;

					cancelAnimationFrame(request);
					request = requestAnimationFrame(() => {
						update(event);
					});
				});

				let update = (e) => {

					var relX = e.pageX - rect.left;
					var relY = e.pageY - rect.top;
					
					TweenMax.to(bg, 1, {
						x: (relX - rect.width/2) / rect.width * 5,
						y: (relY - rect.width/2) / rect.width * -5,
						ease: Power2.easeOut
					})
					TweenMax.to(border, 1, {
						x: (relX - rect.width/2) / rect.width * 30,
						y: (relY - rect.width/2) / rect.width * -30,
						ease: Power2.easeOut
					})
				}

				window.addEventListener('resize scroll', function(){
					rect = box.getBoundingClientRect();
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.box {
	width: 50vw;
	position: relative;
	height: 30rem;
	margin-right: 4%;
	transform: all 0.35 ease;
	.border {
		transform: all 0.35 ease;

		height: 100%;
		width: 100%;
		position: absolute;
		top: -20px;
		right: -20px;
		border: 3px solid white;
		z-index: 0;
	}
}

.box-wrapper {
	overflow: hidden;
	position: relative;
	width: inherit;
	height: inherit;

	img {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 3;
	}
	.image {
		width: 120%;
		background-image: url('../../static/photo.jpg');
		background-size: cover;
		background-position: center;
		height: 120%;
		background-repeat: no-repeat;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
}
.about {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	position: relative;
	margin-bottom: 4rem;

	.text {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		align-items: flex-start;
		.wrap {
			width: 30rem;
			z-index: 5;
			position: absolute;
			background-color: #000;
			padding: 3rem 3rem 3rem 1.5rem;
			bottom: -17%;
			left: 0%;
			p {
				font-size: 1.2rem;
				line-height: 1.8rem;
			}
			.more {
				font-weight: 600;
				margin-top: 2rem;
				text-transform: uppercase;
				font-size: 1.3em;
				text-decoration: none;
				color: white;
				display: flex;
				align-items: center;
				justify-content: space-between;
				transition: all 0.2s linear;
				hr {
					width: 50%;
					transition: all 0.2s linear;
				}
			}
			&:hover {
				cursor: pointer;
				.more {
					color: rgb(156, 154, 154);
					hr {
						width: 70%;
					}
				}
			}
		}
	}
}
@media (max-width: 1200px) {
	.about .text .wrap {
		bottom: -10vw;
	}
}
@media (max-width: 800px) {
	.box {
		width: 100%;
		.border {
			display: none;
		}
	}
	.about {
		margin-bottom: 0;
		.text {
			flex-direction: column;
			.wrap {
				padding: 0;
				position: relative;
				bottom: 0;
				width: 100%;
				margin-bottom: 2rem;
				p {
					font-size: 1rem;
				}
			}
		}
	}
}
@media (max-width: 600px) {
}
</style>
