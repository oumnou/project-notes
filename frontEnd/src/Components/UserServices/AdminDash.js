import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './AdminDash.css'
import '../../App'
import SearchUsers from './SearchUsers'
import UsersList from './UsersList'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

export default function AdminDash() {

	const [usersList, setUsersList] = useState([])
	const [searchedUsers, setSearchedUsers] = useState('')
	const [makeChanges, setMakeChanges] = useState(false)
	const navigate = useNavigate()

	const getUsersList = () => {
		axios.get(`${process.env.REACT_APP_USERS_API}`, {
		params: {
			username: searchedUsers
		}
		})
		.then(response => {
		const list = response.data;
		console.log(list)
		setUsersList(list);
		setSearchedUsers('')
		})
		.catch(error => {
			console.log(error)
		});
	}

	const verifyUser = () => {
		const isAdmin = Cookies.get('isAdmin')
		if (!isAdmin)
			navigate('/login')
		else if ( isAdmin === 'false')
			navigate('/list')
	}

	useEffect(() => {
		verifyUser()
		getUsersList()
		console.log('++++ RE-RENDERING +++');
	  }, [makeChanges]);

  return (
	<div className='contacts-section admin'>

		<SearchUsers setSearchedUsers={setSearchedUsers} setMakeChanges={() => setMakeChanges(!makeChanges)}/>
		<UsersList usersList={usersList} setMakeChanges={() => setMakeChanges(!makeChanges)}/>
	</div>
  )
}
