import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import './CreateNewContact.css'

export default function CreateNewContact({setChanges}) {
  const [contactNum, setContactNum] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
	  
    addNewContactToServer();

    setContactNum('');
    setName('');
	setChanges();
  };

  const addNewContactToServer = async () => {
	const userId = Cookies.get('id')
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_CONTACTS_API}`,
        {
          userId : String(userId),
          tele: contactNum,
          nom: name,
		  email: '',
		  adresse: ''
        }
      );
      console.log(response.data); // Afficher la réponse du serveur si nécessaire
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la contact:', error);
    }
  };

  return (
    <div className='creation-section'>
      <form onSubmit={onSubmitHandler}>
	  <input
          type='text'
          name='name'
          required
          value={name}
		  placeholder='Name Your Contact'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='tel'
          name='Phone Number'
		  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder='Phone 066-111-2222'
          required
          value={contactNum}
          onChange={(e) => setContactNum(e.target.value)}
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}
