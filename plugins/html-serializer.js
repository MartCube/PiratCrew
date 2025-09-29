import * as prismic from '@prismicio/client'

export default defineNuxtPlugin(() => {
  const linkResolver = (doc) => {
    // Return the path depending on Prismic Document's type
    if (doc.type === 'show') {
      return '/shows/' + doc.uid
    }
    return '/not-found'
  }

  return {
    provide: {
      htmlSerializer: (type, element, content, children) => {
        // Generate links to Prismic Documents as <NuxtLink> components
        // Present by default, it is recommended to keep this
        if (type === prismic.Element.hyperlink) {
          let result = ''
          const url = prismic.asLink(element.data, linkResolver)

          if (element.data.link_type === 'Document') {
            result = `<NuxtLink to="${url}">${content}</NuxtLink>`
          } else {
            const target = element.data.target ? `target="'${element.data.target}'" rel="noopener"` : ''
            result = `<a href="${url}" ${target}>${content}</a>`
          }
          return result
        }

        // If the image is also a link to a Prismic Document, it will return a <NuxtLink> component
        // Present by default, it is recommended to keep this
        if (type === prismic.Element.image) {
          let result = `<img src="${element.url}" alt="${element.alt || ''}" copyright="${element.copyright || ''}">`

          if (element.linkTo) {
            const url = prismic.asLink(element.linkTo, linkResolver)

            if (element.linkTo.link_type === 'Document') {
              result = `<NuxtLink to="${url}">${result}</NuxtLink>`
            } else {
              const target = element.linkTo.target ? `target="${element.linkTo.target}" rel="noopener"` : ''
              result = `<a href="${url}" ${target}>${result}</a>`
            }
          }
          const wrapperClassList = [element.label || '', 'block-img']
          result = `<p class="${wrapperClassList.join(' ')}">${result}</p>`
          return result
        }

        // Return null to stick with the default behavior for everything else
        return null
      }
    }
  }
})
