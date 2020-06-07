/* eslint-disable import/prefer-default-export */
import axios from 'axios'

export default async (slug) => {
  const { data } = await axios.get(`${API_BASE_URL}/api/${slug}`) // eslint-disable-line no-undef

  return data
}
