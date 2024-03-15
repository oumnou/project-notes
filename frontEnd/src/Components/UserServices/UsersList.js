import React from 'react'
import UserItem from './UserItem'

export default function UsersList ({usersList, setMakeChanges}) {
  return (
	<div className="list-contacts">
		{!usersList || usersList.length === 0 ? 
			<>No User ...</> :
			usersList.map( (user) => { return <UserItem user={user} setMakeChanges={setMakeChanges} key={user.email}/>})
		}
	</div>
  )
}
