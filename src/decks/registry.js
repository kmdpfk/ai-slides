const modules = import.meta.glob('./*/index.{js,jsx}', { eager: true })

export const decks = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/')[1]
    const meta = mod.default ?? mod
    return { slug, ...meta }
  })
  .sort((a, b) => a.title.localeCompare(b.title, 'da'))

export function getDeck(slug) {
  return decks.find((d) => d.slug === slug)
}
