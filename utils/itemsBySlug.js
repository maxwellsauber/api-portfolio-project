import nostalgiaItemBySlug from '../actions/nostalgiaItemBySlug'

export const getItemSlugFromUrl = location => (location && location.pathname
  ? location.pathname.split('/all/').pop()
  : ''
)
export const retrieveItems = async (location) => {
  const itemSlug = getItemSlugFromUrl(location)

  if (!itemSlug) return { details: {}, categories: [] }

  const { id, name, slug, categories } = await nostalgiaItemBySlug(itemSlug)

  if (!id || !name || !slug || !categories) return { details: {}, categories: [] }

  return { categories, details: { id, name, slug } }
}
