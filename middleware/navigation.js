export default function ({ route, store }) {
	console.log(route.name)
	store.commit('setNavigation', route.name)
}
