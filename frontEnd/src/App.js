import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Dashboard from './Components/ContactServices/Dashboard';
import Login from './Components/UserServices/Login.js';
import SignUp from './Components/UserServices/SignUp.js';
import AdminDash from './Components/UserServices/AdminDash.js';
import UserDash from './Components/ContactServices/UserDash';

function App() {

  return (
	<Dashboard>
		<Router>
			<Routes>
				<Route exact path='/' element={<></>}/>
				<Route path='/list' element={<UserDash />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/admin' element={<AdminDash />} />
			</Routes>
		</Router>
	</Dashboard>
  );
}

export default App;
