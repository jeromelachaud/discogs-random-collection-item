/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react'
const { baseUrl } = require('./config/app')

export const Release = props => {
  const { artists_sort, released_formatted, styles, title, uri } = props
  return (
    <div>
      <h1>{title}</h1>
      <a rel="stylesheet" href={uri} target="_blank" rel="noopener noreferrer">
        <img
          src={`${baseUrl}/images/`}
          alt=""
          style={{ marginBottom: '1.25rem' }}
        />
      </a>
      <ul>
        <li />
        <li>{artists_sort}</li>
        <li>
          <pre>
            {styles.join(' ')}
            {released_formatted ? <small> / {released_formatted}</small> : null}
          </pre>
        </li>
      </ul>
    </div>
  )
}
