import React from 'react'
import axios from 'axios'
import CloseIcon from '../../assets/close-blue.png'
import './DeleteContact.css'
import Cookies from 'js-cookie'


export default function PopUp({toggleDelete, setChanges, contact}) {

	const deleteHandler = async () => {
		
	const userId = Cookies.get('id')

		try {
			const response = await axios.delete(
			  `${process.env.REACT_APP_CONTACTS_API}`,
			  {
				id: contact.id
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

		toggleDelete(contact)
		setChanges();
	}

  return (
	<div className='delete-popup'>
		<div className='gard-div' onClick={() => toggleDelete(contact)}>
			<div className='contact-deletion contact-modification' onClick={(e) => e.stopPropagation()}>
				<img src={CloseIcon} alt='close icon' onClick={() => toggleDelete(contact)} />
				<div>
					<h2>Are You Sure</h2>
					<p>You want delete contact : {contact.nom}</p>
					<span>Number : {contact.tele}</span>
				</div>
				<button onClick={deleteHandler}>Delete</button>
			</div>
		</div>
	</div>
  )
}
