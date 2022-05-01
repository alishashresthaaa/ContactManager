import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditContact = ({ updateContactHandler }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState(location.state.contact.name);
  const [email, setEmail] = useState(location.state.contact.email);

  const editContact = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All fields are mandatory");
      return;
    }
    updateContactHandler({
      id: location.state.contact.id,
      name: name,
      email: email,
    });
    setName("");
    setEmail("");
    navigate("/");
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={editContact}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Please enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="ui button blue">Edit</button>
      </form>
    </div>
  );
};

export default EditContact;
