const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

async function getContactById(contactId) {
	const contacts = await listContacts();
	const desiredContact = contacts.find(contact => contact.id === contactId);
	return desiredContact || null;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const index = contacts.findIndex(contact => contact.id === contactId);

	if (index === -1) {
		return null;
	}

	const deletedContact = contacts.splice(index, 1);
	fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return deletedContact;
}

async function addContact(name, email, phone) {
	const newContact = { id: nanoid(), name, email, phone };
	const contacts = await listContacts();
	contacts.push(newContact);
	fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
}

async function updateContact(contactId, body) {
	const contacts = await listContacts();
	const index = contacts.findIndex(contact => contact.id === contactId);

	if (index === -1) {
		return null;
	}

	contacts[index] = { id: contactId, ...body };
	fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

	return contacts[index];
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};