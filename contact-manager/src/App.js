import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import api from "./api/contact";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import Header from "./components/Header";
import ContactDetail from "./components/ContactDetail";
import EditContact from "./components/EditContact";
import contact from "./api/contact";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const addContactHandler = async (contact) => {
    const res = await api.post("/contacts", contact);
    setContacts([...contacts, res.data]);
  };

  const updateContactHandler = async (contact) => {
    const res = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = res.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...res.data } : contact;
      })
    );
    console.log(res);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  // Retrieve Contacts
  useEffect(() => {
    (async () => {
      const res = await api.get("/contacts");
      if (res.data) setContacts(res.data);
    })();
  }, []);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ContactList
                list={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyWord={searchHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/edit/:id"
            element={
              <EditContact updateContactHandler={updateContactHandler} />
            }
          />
          <Route path={`/contact/:id`} element={<ContactDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
