import React from 'react'
import Validated from '../../assets/check.png'
import Rejected from '../../assets/decline.png'
import Deleted from '../../assets/bin.png'
import './User.css'
import axios from 'axios'

export default function UserItem({user , setMakeChanges}) {

	const userValidity = async (userEmail, state) => {

		try {
			const response = await axios.put(`${process.env.REACT_APP_USERS_API}/${userEmail}`, 
			{
				...user,
				isValid: state
			},
			{
				headers: {
					'Content-Type': "application/json"
				}
			})
		} catch (err) {
			console.log(err)
		}

		setMakeChanges();
	}

	const userAdmin = async (userEmail, state) => {

		try {
			const response = await axios.put(`${process.env.REACT_APP_USERS_API}/${userEmail}`, 
			{
				...user,
				isAdmin: state
			},
			{
				headers: {
					'Content-Type': "application/json"
				}
			})
		} catch (err) {
			console.log(err)
		}

		setMakeChanges();
	}

	const deleteUser = async (userEmail) => {

		try {
			const response = await axios.delete(`${process.env.REACT_APP_USERS_API}/${userEmail}`, {
				params: {
					login: userEmail
				}
			},
			{
				headers: {
					'Content-Type': "application/json"
				}
			});

			console.log(response.data)

		} catch (err)
		{
			console.log(err);
		}

		setMakeChanges();
	}

  return (
	<div className='contact-item'>
		<div className='user-data'>
			<h3>{user.login}</h3>
			<span className={user.isAdmin ? `stat-card val-stat` : `stat-card not-val-stat`} >{user.isAdmin ? 'Admin' : 'Not Admin'}</span>
			<span className={user.isValid ? `stat-card val-stat` : `stat-card not-val-stat`} >{user.isValid ? 'Valid' : 'Not Valid'}</span>
		</div>
		<div className='modifiers'>
			{ user.isValid ? 
				<img src={Rejected} alt='Reject User' onClick={() => {userValidity(user.login, false)}}/>
				:
				<img src={Validated} alt='Validat User' onClick={() => {userValidity(user.login, true)}}/>
			}
			<img src={Deleted} alt='Delete User' onClick={() => deleteUser(user.id)}/>
		</div>
	</div>
  )
}
