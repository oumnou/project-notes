import React, { useState } from 'react'

import './Login.css'
import './SignUp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// 'http://localhost:9040/g-contact/api/users/signup'

export default function SignIn() {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [alert, setAlert] = useState(false)
	const navigate = useNavigate()

	const singUpUser = async () => {
		try {
			const response = await axios.post(
			`${process.env.REACT_APP_USERS_API}`,
			  {
				login: email,
				password: password,
				isAdmin: false,
				isValid: false
			  },
			  {
				headers: {
					'Content-Type': "application/json"
				}
			}
			);
			const data = response.data;
			console.log(data);
			if (!data) {
				setAlert(true)
				setTimeout(() => {
					setAlert(false)
				}, 500);
			}
			setTimeout(() => {navigate('/login')}, 200)
		} catch (error) {
			console.log(error)
		}
	}

	const signUpHandler = (e) => {
		e.preventDefault();

		singUpUser()
		setEmail('')
		setUsername('')
		setPassword('')
	}

  return (
	<div className='signin login'>
		<h1 className='sign-h1'>SignIn</h1>
		<form name='login' onSubmit={signUpHandler}>
			<label>Username</label>
			<input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required/>
			<label>Email</label>
			<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
			<label>Password</label>
			<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
			<button type='submit' className='sign-btn'>SignIn</button>
		</form>
		{!alert ? <></> : <div className='alert'>User already Exists</div>}
	</div>
  )
}
