import React, { useState } from 'react'
import CloseIcon from '../../assets/close-blue.png'
import axios from 'axios'

import './EditContact.css'

export default function EditContact({toggleEdit, setChanges, contact}) {

	const [editedName, setEditedName] = useState(contact.nom)
	const [editedContactNum, setEditedContactNum] = useState(contact.tele)
	const [editedEmail, setEditedEmail] = useState(contact.email || '')
	const [editedAdrress, setEditedAddress] = useState(contact.adresse || '')

	const saveHandler = async () => {
			try {
			  const response = await axios.put(
				`${process.env.REACT_APP_CONTACTS_API}`,
				{
				  ...contact,
				  tele: editedContactNum,
				  nom: editedName,
				  email: editedEmail,
				  adresse: editedAdrress,
				},
				{
					headers: {
						'Content-Type': "application/json"
					}
				}
			  );
			  console.log(response.data); 
			} catch (error) {
			  console.error('Erreur lors de la modification de la contact:', error);
			}
				
		toggleEdit(contact);
		setChanges()
	}

  return (
	<div className='edit-popup'>
		<div className='gard-div' onClick={() => toggleEdit(contact)}>
			<div className='contact-modification' onClick={(e) => e.stopPropagation()}>
				<img src={CloseIcon} alt='close icon' onClick={() => toggleEdit(contact)} />
				<label>Name : </label>
				<input type='text' value={editedName} onChange={(e) => setEditedName(e.target.value)}/>
				<label>Contact Num : </label>
				<input type='tel' name='Phone Number' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={editedContactNum} onChange={(e) => setEditedContactNum(e.target.value)}/>
				<label>E-mail : </label>
				<input type='email' value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)}/>
				<label>Adress : </label>
				<input type='text' value={editedAdrress} onChange={(e) => setEditedAddress(e.target.value)} />
				<button onClick={saveHandler}>Save</button>
			</div>
		</div>
	</div>
  )
}
