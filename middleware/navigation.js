export default defineNuxtRouteMiddleware((to) => {
	const { setNavigation } = useNavigation()
	setNavigation(to.name)
})
