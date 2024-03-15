import React from 'react'
import EditIcon from '../../assets/pen.png';
import DeleteIcon from '../../assets/bin.png';
import UserIcon from '../../assets/contact-user.png';

import './ContactItem.css';

export default function ContactItem({contact, toggleEdit, editContact, deleteContact}) {


  return (
	<div className='contact-item'>
			<img src={UserIcon} alt='Contact-Icon' className='contact-icon'/>
		<div className='contact-data'>
			<h3>{contact.nom}</h3>
			<span>{contact.tele}</span>
		</div>
		<div className='modifiers'>
			<img src={EditIcon} alt='edit contact' onClick={() => {editContact(contact)}}/>
			<img src={DeleteIcon} alt='delete contact' onClick={() => {deleteContact(contact)}}/>
		</div>
	</div>
  )
}
