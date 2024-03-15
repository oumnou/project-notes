import React, { useState } from 'react'

export default function SearchUsers({setSearchedUsers, setMakeChanges}) {

	const [search, setSearch] = useState('')

	const onSubmitHandler = (e) => {
		e.preventDefault()
		
		setSearchedUsers(search);
		setSearch('')
		setMakeChanges()
	}

  return (
	<div className='creation-section'>
		<form onSubmit={onSubmitHandler}>
			<input
			type='text'
			name='title'
			placeholder='Search By UserName ...'
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			required
			/>
			<button type='submit'>Search</button>
		</form>
	</div>
  )
}
