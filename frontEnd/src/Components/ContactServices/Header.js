import React, { useEffect, useState } from 'react'
import ContactIcon from '../../assets/contacts-book.png'
import { useLocation } from 'react-router-dom'

export default function Header({state}) {

	const [loggedIn, setLoggedIn] = useState(false)

	useEffect(() => {
		if (window.location.pathname === '/list' || window.location.pathname === '/admin')
			setLoggedIn(true)
		else
			setLoggedIn(false)
	}, [])

  return (
	<header>
		<div className='logo-identity'>
			<img src={ContactIcon} alt="contact-icon" />
			<div className='logo-slogon'>
				<h2>Contact-Book</h2>
				<span>Manage Your Contacts easily</span>
			</div>
		</div>
		<nav>
			{
				loggedIn ? 
				<div className='auth-btn'>
					<a href='/login' className='sign-btn'>LogOut</a>
				</div> 
				:
				<div className='auth-btn'>
					<a href='/login' className='log-btn'>Login</a>
					<a href='/signup' className='sign-btn'>SignUp</a>
				</div>
			}
		</nav>
	</header>
  )
}
