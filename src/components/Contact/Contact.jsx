// Contact.jsx

import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";

import css from "./Contact.module.css";
import { deleteContact } from "../../redux/contacts/contactsOps";

function Contact({ contact: { name, number, id } }) {
  const dispatch = useDispatch();

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.contactContainer}>
      <div className={css.contactItem}>
        <p>
          <FaUser className={css.contactIcon} />
          {name}
        </p>
        <p>
          <FaPhoneAlt className={css.contactIcon} />
          {number}
        </p>
      </div>
      <button
        className={css.deleteButton}
        onClick={() => handleDeleteContact(id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Contact;
