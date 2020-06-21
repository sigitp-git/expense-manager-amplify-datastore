import React from 'react'
// load spinning gif from public/loader.svg

const Loading = () => (
  <div className='loader'>
    <img className='loader__image' src='/loader.svg' alt='loading.svg'/>
  </div>
)

export default Loading