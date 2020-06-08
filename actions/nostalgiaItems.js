/* eslint-disable import/prefer-default-export */
import axios from 'axios'

export default async () => {
  const { data } = await axios.get(`${API_BASE_URL}/all`) // eslint-disable-line no-undef
  return data
}
