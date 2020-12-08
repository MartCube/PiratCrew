export const state = () => ({
	theme: null,
	navigation: null,
})

// Functions that return back data contained in the state.
export const getters = {
	theme: (state) => state.theme,
	navigation: (state) => state.navigation,
}

// Functions that directly mutate the state.
export const mutations = {
	setTheme(state, value) {
		state.theme = value
	},
	setNavigation(state, value) {
		switch (value) {
			case 'index___en':
				state.navigation = ['intro', 'about', 'portfolio', 'contact']
				break
			case 'index___ru':
				state.navigation = ['вступление', 'около', 'портфолио', 'контакт']
				break
			case 'event_uid___en':
				state.navigation = ['intro', 'event', 'contact']
				break
			case 'event_uid___ru':
				state.navigation = ['вступление', 'событие', 'контакт']
				break
			default:
				state.navigation = []
		}
	},
}

// Functions that call mutations on the state. They can call multiple mutations, can call other actions, and they support asynchronous operations.
export const actions = {}
