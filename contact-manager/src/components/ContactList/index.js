import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "../ContactCard";

const ContactList = ({ list, getContactId, term, searchKeyWord }) => {
  const deleteContactHandler = (id) => {
    getContactId(id);
  };

  const inputEl = useRef("");
  const getSearchTerm = () => {
    searchKeyWord(inputEl.current.value);
  };
  return (
    <div className="ui celled list" style={{ marginTop: "100px" }}>
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      {list.length > 0 ? (
        list.map((item, key) => {
          return (
            <ContactCard
              key={item.id}
              item={item}
              clickHandler={deleteContactHandler}
            />
          );
        })
      ) : (
        <div>No contacts available</div>
      )}
    </div>
  );
};

export default ContactList;
