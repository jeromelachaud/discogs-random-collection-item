import React from 'react'
const { baseUrl } = require('./config/app')

export const Release = props => {
  const { artists_sort, released_formatted, styles, title } = props
  return (
    <div>
      <h1>{title}</h1>
      <img
        src={`${baseUrl}/images/`}
        alt=""
        style={{ marginBottom: '1.25rem' }}
      />
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
