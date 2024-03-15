import React, { useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

export default function Login() {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [alert, setAlert] = useState(false)
	const [validation, setValidation] = useState(true)
	const navigate = useNavigate()

	const logUser = async () => {
		try {
			const response = await axios.post(
			`${process.env.REACT_APP_USERS_API}/login`,
			{
				login: email,
				password: password
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
					setTimeout(() => 
						{navigate('/signup')}, 200)
				}, 500);
			}
			else {
				Cookies.set('id', data.id)
				if (data.isAdmin)
				{
					navigate('/admin')
					Cookies.set('isAdmin', true)
				}
				else {
					Cookies.set('isAdmin', false)
					navigate('/list')
				}
			}

			console.log(data);
		} catch (error) {
			console.log(error)
		}
	}

	const handleLogin = (e) => {
		e.preventDefault();
		logUser();
		setEmail('')
		setPassword('')
	}

	useEffect(() => {
		Cookies.remove('id')
		Cookies.remove('isAdmin')
	}, [])

  return (
	<div className='login'>
		<h1 className='log-h1'>LogIn</h1>
		<form name='login' onSubmit={handleLogin}>
			<label>Email</label>
			<input type='email' value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
			<label>Password</label>
			<input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} required />
			<button type='submit'>LogIn</button>
		</form>
		{!alert ? <></> : <div className='alert err'>No User With This Coordinates</div>}
		{validation ? <></> : <div className='alert val-tmp'>Wait Until The Admin Valid Your Account</div>}
	</div>
  )
}
