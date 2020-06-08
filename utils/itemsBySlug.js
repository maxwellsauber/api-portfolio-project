import nostalgiaItemBySlug from '../actions/nostalgiaItemBySlug'

export const getItemSlugFromUrl = location => (location && location.pathname
  ? location.pathname.split('/item/').pop()
  : ''
)
export const retrieveItems = async (location) => {
  const itemSlug = getItemSlugFromUrl(location)

  if (!itemSlug) return { details: {}, categories: [] }

  const [data] = await nostalgiaItemBySlug(itemSlug)
  const {
    id, name, slug, categories, characters, decades, description, tags,
  } = data


  if (!id || !name || !slug || !categories) return { details: {}, categories: [] }

  return {
    id, name, slug, categories, characters, decades, description, tags,
  }
}
