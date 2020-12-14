export const state = () => ({
	navigation: null,
})

// Functions that return back data contained in the state.
export const getters = {
	navigation: (state) => state.navigation,
}

// Functions that directly mutate the state.
export const mutations = {
	setNavigation(state, value) {
		switch (value) {
			case 'index___en':
				state.navigation = [
					{ value: 'intro', text: 'intro' },
					{ value: 'about', text: 'about' },
					{ value: 'shows', text: 'shows' },
					{ value: 'contact', text: 'contact' },
				]
				break
			case 'index___ru':
				state.navigation = [
					{ value: 'intro', text: 'интро' },
					{ value: 'about', text: 'о нас' },
					{ value: 'shows', text: 'шоу' },
					{ value: 'contact', text: 'контакты' },
				]
				break
			case 'event_uid___en':
				state.navigation = [
					{ value: 'intro', text: 'intro' },
					{ value: 'event', text: 'event' },
					{ value: 'contact', text: 'contact' },
				]
				break
			case 'event_uid___ru':
				state.navigation = [
					{ value: 'intro', text: 'интро' },
					{ value: 'event', text: 'шоу' },
					{ value: 'contact', text: 'контакты' },
				]
				break
			case 'about___en':
				state.navigation = [
					{ value: 'about', text: 'о нас' },
					{ value: 'crew', text: 'crew' },
				]
				break
			case 'about___ru':
				state.navigation = [
					{ value: 'about', text: 'о нас' },
					{ value: 'crew', text: 'банда' },
				]
				break
			default:
				state.navigation = []
		}
	},
}

// Functions that call mutations on the state. They can call multiple mutations, can call other actions, and they support asynchronous operations.
export const actions = {}
