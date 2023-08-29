import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const generetedId = () => {
    return nanoid(5);
  };

  const handleChangeFilter = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = deleteId => {
    setContacts(PrevState =>
      PrevState.filter(contact => contact.id !== deleteId)
    );
    setFilter('');
  };

  const formSubmitHandler = data => {
    console.log(data);
    if (contacts.some(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    setContacts([
      ...contacts,
      { id: generetedId(), name: data.name, number: data.number },
    ]);
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div
      style={{
        padding: '20px 0 0 0',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: '#010101',
      }}
    >
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2 className={css.subtitle}>Contacts</h2>
      <p className={css.total}>
        Total contacts:
        <span className={css.total_count}> {contacts.length}</span>
      </p>
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList
        filteredContacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
