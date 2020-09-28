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


export function navBarAnimHorizontal(navbarItems, navbarItemsLine) {
  const StartUpTimeline = anime.timeline({
    autoplay: true,
  });

	StartUpTimeline.add(
    {
      targets: navbarItems,
      opacity: [0, 1],
      easing: "easeOutCubic",
			translateT: ["-100%", "0%"],
      duration: 1000,
    },
    0
  ).add(
    {
      targets: navbarItemsLine,
      width: [0, "4vw"],
      easing: "easeOutCubic",
      duration: 1000,
    },
    1000
  );
}
export function navBarAnimVertical(navbarItems, navbarItemsLine) {
	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	StartUpTimeline.add(
    {
      targets: navbarItems,
      opacity: [0, 1],
      easing: "easeOutCubic",
      duration: 1000,
    },
    0
  ).add(
    {
      targets: navbarItemsLine,
      height: [0, "4vw"],
      easing: "easeOutCubic",
      duration: 1000,
    },
    1000
  );
	
}
export function widthStretch(navbarLine) {
	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	StartUpTimeline.add({
    targets: navbarLine,
    delay: 750,
    width: [0, "20%"],
    easing: "easeOutCubic",
    duration: 1000,
  });
	
}
export function fadeIn(target) {
	const StartUpTimeline = anime.timeline({
		autoplay: true,
	})

	StartUpTimeline.add({
    targets: target,
    opacity: [0, 1],
    easing: "easeOutCubic",
    duration: 750,
  }, 0);
	
}


export function introAnim(letters) {
	anime({
		targets: letters,
		strokeDashoffset: [anime.setDashoffset, 0],
		opacity: [0, 1],

		easing: 'easeInOutCubic',
		delay: anime.stagger(200, { from: 'center' }),
		duration: 1200,
	})
}
