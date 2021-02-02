import anime from 'animejs'

export function textAnim(text, box) {
	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	StartUpTimeline.add(
		{
			targets: box,
			width: '100%',
			easing: 'easeOutCubic',
			duration: 750,
		},
		0,
	)
		.add(
			{
				targets: box,
				translateX: ['0%', '-98%'],
				easing: 'easeOutCubic',
				duration: 750,
			},
			750,
		)
		.add(
			{
				targets: text,
				opacity: [0, 1],
				translateX: ['100%', '0%'],
				easing: 'easeOutCubic',
				duration: 750,
			},
			750,
		)
}

export function introAnim(letters) {
	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	StartUpTimeline.add(
		{
			targets: letters,
			strokeDashoffset: [anime.setDashoffset, 0],
			opacity: [0, 1],
			easing: 'easeInOutCubic',
			delay: anime.stagger(200, { from: 'center' }),
			duration: 1000,
		},
		0,
	)
}

export function navbarMenu(links) {
	anime({
		targets: links,
		opacity: [0, 1],
		translateY: ['100%', '0'],
		easing: 'easeInOutCubic',
		delay: anime.stagger(50, { from: 'last' }),
		duration: 350,
	})
}

export function navbarTop(logo, line, logoText) {
	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	StartUpTimeline.add({
		targets: line,
		opacity: [0, 1],
		width: ['0%', '100%'],
		easing: 'easeOutCubic',
		duration: 1000,
		offset: 0,
	})
		.add({
			targets: logoText,
			opacity: [0, 1],
			translateX: ['-50%', '0%'],
			easing: 'easeOutCubic',
			duration: 1000,
			offset: 1000,
		})
		.add({
			targets: logo,
			opacity: [0, 1],
			easing: 'easeOutCubic',
			duration: 1000,
			offset: 1500,
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
