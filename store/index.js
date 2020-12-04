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
		if (value === 'index___en') state.navigation = ['intro', 'about', 'portfolio', 'contact']
		if (value === 'index___ru') state.navigation = ['вступление', 'около', 'портфолио', 'контакт']
		if (value === 'event_uid') state.navigation = ['intro', 'event', 'contact']
		if (value === 'about') state.navigation = []
		if (value === 'events') state.navigation = []
		if (value === 'contact') state.navigation = []
		if (value === 'artist') state.navigation = []
	},
}

// Functions that call mutations on the state. They can call multiple mutations, can call other actions, and they support asynchronous operations.
export const actions = {}
