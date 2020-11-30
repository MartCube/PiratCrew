export default function ({ route, store }) {
	store.commit('setNavigation', route.name)
}
