import React from 'react'

import './Header.css'
import Header from './Header'

export default function Dashboard({children}) {

  return (
	<div className="container">
		<Header />
		{children}
    </div>
  )
}