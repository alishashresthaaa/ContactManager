import React from "react";
import { Link } from "react-router-dom";
const ContactCard = ({ item, clickHandler }) => {
  return (
    <div className="item" key={item.id}>
      <div className="content">
        <Link state={{ contact: item }} to={`/contact/${item.id}`}>
          <div className="header">{item.name}</div>
          <div>{item.email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", float: "right", marginLeft: "10px" }}
        onClick={() => clickHandler(item.id)}
      ></i>
      <Link to={`/edit/${item.id}`} state={{ contact: item }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", float: "right" }}
        ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
