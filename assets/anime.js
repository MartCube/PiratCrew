import anime from 'animejs'

export function textAnim(text, box) {
	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	StartUpTimeline.add({
		targets: box,
		width: '100%',
		easing: 'easeOutCubic',
		duration: 750,
		offset: 0,
	})
		.add({
			targets: box,
			translateX: ['0%', '110%'],
			easing: 'easeOutCubic',
			duration: 750,
			offset: 750,
		})
		.add({
			targets: text,
			opacity: [0, 1],
			translateX: ['-100%', '0%'],
			easing: 'easeOutCubic',
			duration: 750,
			offset: 750,
		})
}

export function introAnim(letters) {
	anime({
		targets: letters,
		strokeDashoffset: [anime.setDashoffset, 0],
		opacity: [0, 1],
		easing: 'easeInOutCubic',
		delay: anime.stagger(200, { from: 'center' }),
		duration: 1000,
	})
}

export function navbarTop(logo, line) {
	anime({
		targets: logo,
		opacity: [0, 1],
		easing: 'easeOutCubic',
		duration: 2000,
		dellay: 0,
	})
	anime({
		targets: line,
		opacity: [0, 1],
		translateX: ['50%', '0%'],
		easing: 'easeOutCubic',
		duration: 1000,
		offset: 0,
	})
}

export function navbarRight(item, line) {
	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	StartUpTimeline.add({
		targets: line,
		opacity: [0, 1],
		height: ['0%', '4vh'],
		easing: 'easeOutCubic',
		duration: 1000,
		offset: 0,
	}).add({
		targets: item,
		opacity: [0, 1],
		translateY: ['-50%', '0%'],
		easing: 'easeOutCubic',
		duration: 1000,
		offset: 1000,
	})
}

export function navbarBottom(item, line) {
	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	StartUpTimeline.add({
		targets: line,
		opacity: [0, 1],
		width: ['0%', '4vh'],
		easing: 'easeOutCubic',
		duration: 1000,
		offset: 0,
	}).add({
		targets: item,
		opacity: [0, 1],
		translateX: ['50%', '0%'],
		easing: 'easeOutCubic',
		duration: 1000,
		offset: 1000,
	})
}

export function navbarLeft(item, line) {
	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	StartUpTimeline.add({
		targets: line,
		opacity: [0, 1],
		height: ['0%', '4vh'],
		easing: 'easeOutCubic',
		duration: 1000,
		offset: 0,
	}).add({
		targets: item,
		opacity: [0, 1],
		translateY: ['-50%', '0%'],
		easing: 'easeOutCubic',
		duration: 1000,
		offset: 1000,
	})
}
