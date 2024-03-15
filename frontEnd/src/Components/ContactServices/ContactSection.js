import React, { useState } from 'react'
import CreateNewContact from './CreateNewContact'
import ContactItem from './ContactItem'
import EditContact from './EditContact'
import PopUp from './DeleteContact'

import './ContactSection.css'

export default function ContactSection({contacts, setChanges}) {

	const [editIsOpen, setEditIsOpen] = useState(false)
	const [deleteIsOpen, setDeleteIsOpen] = useState(false)
	const [willEditContact, setWillEditContact] = useState({})

	const toggleEdit = (contact) => {
		setWillEditContact(contact)
		setEditIsOpen(!editIsOpen)
	}

	const toggleDelete = (contact) => {
		setWillEditContact(contact)
		setDeleteIsOpen(!deleteIsOpen)
	}

  return (
	<div className="contacts-section">
		{!deleteIsOpen ? <></> : <PopUp toggleDelete={toggleDelete} setChanges={setChanges} contact={willEditContact} />}
		{!editIsOpen ? <></> : <EditContact toggleEdit={toggleEdit} setChanges={setChanges} contact={willEditContact} />}
		<CreateNewContact setChanges={setChanges}/>
		<div className="list-contacts">
			{!contacts || contacts.length === 0 ? <>No contact ...</> :
				contacts.map((contact) => {return (
					<ContactItem key={contact.id} contact={contact} editContact={toggleEdit} deleteContact={toggleDelete}/>
				)})
			}
		</div>
	</div>
  )
}
