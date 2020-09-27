import anime from 'animejs'

export function menuAnim(circles, circlesW, circlesX, circlesP, active) {
	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	if (active) {
		StartUpTimeline.add({
			targets: circlesP,
			opacity: 0,
			translateY: [0, '50px'],
			translateX: [0, '50px'],
			easing: 'easeOutQuart',
			duration: 250,
		}).add(
			{
				targets: circlesX,
				opacity: [0, 1],
				translateY: ['50px', 0],
				translateX: ['50px', 0],
				easing: 'easeInQuart',
				duration: 250,
			},
			0,
		)
	} else {
		StartUpTimeline.add({
			targets: circlesX,
			opacity: 0,
			translateY: [0, '50px'],
			translateX: [0, '50px'],
			easing: 'easeOutQuart',
			duration: 250,
		}).add(
			{
				targets: circlesP,
				opacity: [0, 1],
				translateY: ['50px', 0],
				translateX: ['50px', 0],
				easing: 'easeInQuart',
				duration: 250,
			},
			0,
		)
	}
}

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
				translateX: ['0%', '110%'],
				easing: 'easeOutCubic',
				duration: 750,
			},
			750,
		)
		.add(
			{
				targets: text,
				opacity: [0, 1],
				translateX: ['-100%', '0%'],
				easing: 'easeOutCubic',
				duration: 750,
			},
			750,
		)
}
