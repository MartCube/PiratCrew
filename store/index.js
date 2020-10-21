export const state = () => ({
	theme: null,
})

// Functions that return back data contained in the state.
export const getters = {
	theme: (state) => state.theme,
}

// Functions that directly mutate the state.
export const mutations = {
	setTheme(state, value) {
		state.theme = value
	},
}

// Functions that call mutations on the state. They can call multiple mutations, can call other actions, and they support asynchronous operations.
export const actions = {
	getData(payload) {
		console.log(payload)
	},
}
