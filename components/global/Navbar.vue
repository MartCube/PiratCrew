<script setup>
import { navbarTop, navbarBottom, navbarRight, navbarLeft, navbarMenu } from '~/assets/anime'

// Template refs
const navbarRef = ref(null)

// Реактивні дані
const showMenu = ref(false)

// Глобальний стан навігації
const { navigation } = useNavigation()

// i18n composables
const { locales, locale, t, setLocale } = useI18n()

// Computed значення (кешуємо рік)
const year = computed(() => new Date().getFullYear())
const availableLocales = computed(() => locales.value)

// Реактивна змінна для поточної мови (не computed!)
const currentLocale = ref(locale.value)

// Кешуємо селектори для performance
let cachedElements = null

const getCachedElements = () => {
	if (!cachedElements && navbarRef.value) {
		cachedElements = {
			navbarLogo: navbarRef.value.querySelectorAll('.top .logo picture'),
			navbarTopText: navbarRef.value.querySelectorAll('.top .logo .item .text'),
			navbarTopLines: navbarRef.value.querySelectorAll('.top .line'),
			navbarRightItems: navbarRef.value.querySelectorAll('.right .item .text'),
			navbarRightLines: navbarRef.value.querySelectorAll('.right .line'),
			navbarBottomItems: navbarRef.value.querySelectorAll('.bottom .item .text'),
			navbarBottomLines: navbarRef.value.querySelectorAll('.bottom .line'),
			navbarLeftItems: navbarRef.value.querySelectorAll('.left .item .text'),
			navbarLeftLines: navbarRef.value.querySelectorAll('.left .line'),
			menuLinks: navbarRef.value.querySelectorAll('.menu .links a')
		}
	}
	return cachedElements
}

// Методи
const toggleMenu = () => {
	showMenu.value = !showMenu.value
}

const scrollToSection = (sectionId) => {
	const element = document.getElementById(sectionId)
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' })
	}
}

// Функція зміни мови
const switchLang = async (value) => {
	try {
		await setLocale(value)
		currentLocale.value = value
	} catch (error) {
	}
}

// Синхронізуємо currentLocale з locale при зміні ззовні
watch(locale, (newLocale) => {
	currentLocale.value = newLocale
})

// Ініціалізація анімацій (винесено в окрему функцію)
const initializeAnimations = () => {
	const elements = getCachedElements()
	if (!elements) return

	navbarTop(elements.navbarLogo, elements.navbarTopLines, elements.navbarTopText)
	navbarRight(elements.navbarRightItems, elements.navbarRightLines)
	navbarBottom(elements.navbarBottomItems, elements.navbarBottomLines)
	navbarLeft(elements.navbarLeftItems, elements.navbarLeftLines)
}

// Watchers з оптимізацією
watch(navigation, async () => {
	await nextTick()
	const elements = getCachedElements()
	if (elements) {
		navbarRight(elements.navbarRightItems, elements.navbarRightLines)
	}
})

watch(currentLocale, async () => {
	await nextTick()
	const elements = getCachedElements()
	if (elements) {
		navbarBottom(elements.navbarBottomItems, elements.navbarBottomLines)
	}
})

watch(showMenu, (newValue) => {
	if (newValue) {
		// Меню відкривається - запускаємо анімацію появи
		nextTick(() => {
			const elements = getCachedElements()
			if (elements) {
				navbarMenu(elements.menuLinks)
			}
		})
	} else {
		// Меню закривається - можна додати анімацію зникнення якщо потрібно
		const elements = getCachedElements()
		if (elements?.menuLinks) {
			// Плавно ховаємо посилання перед закриттям меню
			elements.menuLinks.forEach((link, index) => {
				setTimeout(() => {
					link.style.opacity = '0'
				}, index * 50) // Затримка для кожного посилання
			})
		}
	}
})

// Lifecycle - оптимізований onMounted
onMounted(async () => {
	await nextTick()
	initializeAnimations()

	// Ініціалізація поточної мови (якщо потрібно)
	currentLocale.value = locale.value

})

// Очищення кешу при unmount
onUnmounted(() => {
	cachedElements = null
})
</script>

<template>
	<div ref="navbarRef" class="navbar">
		<div class="top">
			<NuxtLink class="logo" :to="'/'" @click="showMenu = false">
				<ImageItem src="/logo.png" width="30" height="30" alt="logo" />

				<div class="item">
					<p class="text">pirat crew dance acrobatic theater</p>
				</div>
			</NuxtLink>

			<div class="button" :class="{ active: showMenu }" @click="toggleMenu">
				<div class="line" />
				<div class="line" />
				<div class="cancel" />
			</div>
		</div>
		<div class="right">
			<div v-for="(item, i) in navigation" :key="i" class="item">
				<div @click="scrollToSection(item.value)" class="text-wrap">
					<span class="text">{{ item.text }}</span>
				</div>
				<div :key="'line' + i" class="line" />
			</div>
		</div>
		<div class="bottom">
			<div class="line" />
			<div class="item">
				<button
					v-for="locale in availableLocales"
					:key="locale.code"
					class="text"
					:class="{ active: locale.code === currentLocale }"
					@click="switchLang(locale.code)"
				>
					{{ locale.name }}
				</button>
			</div>
			<div class="line" />
			<div class="item">
				<NuxtLink class="text" to="/privacy-policy"> Privacy Policy </NuxtLink>
			</div>
			<div class="line" />
			<div class="item">
				<p class="text year">copy right {{ year }}</p>
			</div>
		</div>
		<div class="left">
			<div class="line" />
			<div class="item">
				<a class="text" target="blank" rel="nofollow" href="https://www.facebook.com/piratcrewshow/"> facebook </a>
			</div>
			<div class="line" />
			<div class="item">
				<a class="text" target="blank" rel="nofollow" href="https://www.instagram.com/piratcrew/"> instagram </a>
			</div>
			<div class="line" />
			<div class="item">
				<a class="text" target="blank" rel="nofollow" href="https://www.youtube.com/channel/UCJjlUOVeQyATgVOqGss6C_Q"> youtube </a>
			</div>
		</div>

		<Transition name="menu-fade">
			<div v-show="showMenu" class="menu">
				<div class="links" @click="toggleMenu">
					<NuxtLink :to="'/about'"> {{ t('pages.about') }}</NuxtLink>
					<!-- <NuxtLink :to="'/events'"> {{ t('pages.events') }}</NuxtLink> -->
					<NuxtLink :to="'/shows'"> {{ t('pages.shows.name') }}</NuxtLink>
					<NuxtLink :to="'/casting'"> {{ t('pages.casting') }}</NuxtLink>
					<NuxtLink :to="'/contact'"> {{ t('pages.contact') }}</NuxtLink>
				</div>
			</div>
		</Transition>
	</div>
</template>



<style lang="scss" scoped>
$size: 40px;

// Анімація меню
.menu-fade-enter-active,
.menu-fade-leave-active {
	transition: opacity 0.4s cubic-bezier(0.33, 1, 0.68, 1);
}

.menu-fade-enter-from,
.menu-fade-leave-to {
	opacity: 0;
}

.menu-fade-enter-to,
.menu-fade-leave-from {
	opacity: 1;
}

.navbar {
	position: fixed;
	top: 0;
	z-index: 99;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	align-content: center;

	.menu {
		width: 100%;
		height: calc(100vh - 80px);
		margin: 40px;
		background: black;

		display: flex;
		justify-content: center;
		align-items: center;

		.links {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			a {
				opacity: 0; //anime
				width: fit-content;
				text-decoration: none;
				color: white;
				font-size: 2em;
				text-transform: uppercase;

				&::after {
					content: '';
					display: block;
					width: 2px;
					height: 0px;
					background: white;

					transition: all 0.35s cubic-bezier(0.33, 1, 0.68, 1);
				}
				transition: all 0.35s cubic-bezier(0.33, 1, 0.68, 1);

				&:hover {
					opacity: 0.75;
					&:after {
						height: 80px;
					}
				}

				&.nuxt-link-exact-active {
					opacity: 0.75;
					&:after {
						height: 80px;
					}
				}
			}
		}
	}

	.top {
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		height: $size;
		padding: 0 $size;

		background: black;
		user-select: none;

		display: flex;
		justify-content: space-between;
		align-items: center;
		.logo {
			display: flex;
			align-items: center;

			padding: 5px;
			text-decoration: none;
			color: white;
			picture {
				width: 30px;
				height: 30px;
				margin-right: 15px;
			}
			.item {
				overflow: hidden;
				.text {
					opacity: 0; //anime
					text-transform: uppercase;
					font-size: 14px;
				}
			}
		}
		.button {
			margin: 5px;
			height: 30px;
			width: 30px;
			cursor: pointer;

			position: relative;
			overflow: hidden;

			display: flex;
			flex-direction: column;
			justify-content: space-evenly;

			transition: all 0.35s cubic-bezier(0.33, 1, 0.68, 1);
			&.active {
				.cancel {
					opacity: 1;
					top: 12px;
					transform: rotate(50deg);
				}
			}
			.cancel {
				position: absolute;
				top: 0;
				width: 100%;
				height: 2px;
				background: white;
				transform: rotate(0deg);
				opacity: 0;
				transition: all 0.35s cubic-bezier(0.33, 1, 0.68, 1);
			}
			.line {
				width: 0; //anime
				height: 2px;
				background: white;
			}
		}
	}
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: $size;
		padding: 0 $size;

		background: black;
		user-select: none;

		display: flex;
		justify-content: flex-end;
		align-items: center;
		.item {
			height: $size;
			overflow: hidden;
			cursor: pointer;
			display: flex;
			justify-content: center;

			.text {
				opacity: 0; //anime
				padding: 13px;

				text-transform: uppercase;
				font-size: 12px;

				display: block;
				text-decoration: none;
				color: white;
				background: none;
				border: none;
				cursor: pointer;

				&.year {
					padding-right: 0;
				}
				&.active {
					display: none;
				}
			}
			&:hover {
				opacity: 0.75;
			}
		}
		.line {
			width: 0; //anime
			height: 2px;
			background: #fff;
			display: block;
		}
	}
	.right {
		position: fixed;
		right: 0;
		bottom: 0;
		width: $size;
		height: 100%;
		padding: $size 0;

		background: black;
		user-select: none;
		transform: initial;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		.item {
			width: $size;
			overflow: hidden;
			cursor: pointer;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.text-wrap{
				padding: 2vh 0;

			}

			.text {
				opacity: 0; //anime
				text-transform: uppercase;
				writing-mode: vertical-rl;
				text-orientation: mixed;
				font-size: 14px;

			}
			&:first-child {
				padding-top: 0;
			}
			&:hover {
				opacity: 0.75;
			}
			.line {
				width: 2px;
				height: 0; //anime
				background: #fff;
			}
		}

	}
	.left {
		position: fixed;
		left: 0;
		bottom: 0;
		width: $size;
		height: 100%;
		padding: $size 0;

		user-select: none;
		background: black;
		transform: initial;

		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		align-content: center;

		.item {
			width: $size;
			padding: 2vh 0;
			overflow: hidden;
			transform: rotate(180deg);

			display: flex;
			justify-content: center;
			.text {
				opacity: 0; //anime
				text-decoration: none;
				font-size: 14px;
				color: white;
				text-transform: uppercase;
				writing-mode: vertical-rl;
				text-orientation: mixed;
			}
			&:hover {
				opacity: 0.75;
			}
			&:last-child {
				padding-top: 0;
			}
		}
		.line {
			width: 2px;
			height: 0; //anime
			background: #fff;
		}
	}
}

@media (max-width: 800px) {
	.navbar {
		.menu .links {
			width: fit-content;
			height: 80%;
			flex-direction: column;
			align-items: flex-start;

			a {
				&:hover {
					opacity: initial;
					&:after {
						height: initial;
					}
				}
				&:focus {
					opacity: 0.75;
					&:after {
						height: 80px;
					}
				}
				&.nuxt-link-active,
				&.nuxt-link-exact-active {
					opacity: 0.75;
					&:after {
						height: 80px;
					}
				}
			}
		}
		.top,
		.right,
		.bottom,
		.left {
			.logo .item .text {
				font-size: 12px;
			}

			.item .text {
				font-size: 12px;
			}
		}
	}
}
</style>
