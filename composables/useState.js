export const useModal = () => useState('modal', () => false)

export const useNavigation = () => {
  const navigation = useState('navigation', () => [])

  const setNavigation = (routeName) => {
    switch (routeName) {
      case 'index___en':
        navigation.value = [
          { value: 'intro', text: 'intro' },
          { value: 'about', text: 'about' },
          { value: 'shows', text: 'shows' },
          { value: 'contact', text: 'contact' },
        ]
        break
      case 'index___ua':
        navigation.value = [
          { value: 'intro', text: 'интро' },
          { value: 'about', text: 'о нас' },
          { value: 'shows', text: 'шоу' },
          { value: 'contact', text: 'контакты' },
        ]
        break
      case 'shows-show_uid___ua':
        navigation.value = [
          { value: 'intro', text: 'интро' },
          { value: 'event', text: 'шоу' },
          { value: 'contact', text: 'контакты' },
        ]
        break
      default:
        navigation.value = []
    }
  }

  return {
    navigation: readonly(navigation),
    setNavigation
  }
}