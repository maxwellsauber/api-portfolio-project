import React from 'react'

export default ({ id, name, slug }) => (
  <li key={id}><a href={`api/${slug}`}>{`${name}`}</a></li>
)
