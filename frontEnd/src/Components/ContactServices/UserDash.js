import React, { useState, useEffect } from 'react';
import ContactSection from './ContactSection';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function UserDash() {
  const [contactsList, setContactsList] = useState([]); // Declare contactsList state
  const [MakeChanges, setChanges] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
	const isAdmin = Cookies.get('isAdmin')
	if (isAdmin && isAdmin === '1')
			navigate('/admin')
	const userId = Cookies.get('id')
	if (!userId || userId === '')
		navigate('/login')
	else {
		axios.get(`${process.env.REACT_APP_CONTACTS_API}`, 
		{
			params: {
				userId
			}
		},
		{
			headers: {
				'Content-Type': "application/json"
			}
		})
		.then(response => {
		  const contacts = response.data; 
		  console.log("All contacts : ", contacts)
		  setContactsList(contacts);
		})
		.catch(error => {
		  console.error('Error fetching contacts:', error);
		});
	}

	
	console.log("++++ RE-RENDERING +++")
  }, [MakeChanges]);

  return (
    <ContactSection contacts={contactsList} setChanges={() => setChanges(!MakeChanges)}/>
  );
}
