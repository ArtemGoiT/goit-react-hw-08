import { Grid } from "react-loader-spinner";
import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import Notification from "../Notification/Notification";
import { selectFilteredContacts } from "../../redux/contacts/selectors";

const ContactList = ({ handleEditContact }) => {
  const contacts = useSelector(selectFilteredContacts);

  const filteredContacts = useSelector(selectFilteredContacts);

  if (!contacts.length) return <Notification title={"No contacts yet"} />;

  if (!filteredContacts.length)
    return <Notification title={"Contacts are not found"} />;

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {filteredContacts.map(({ id, name, number }) => (
        <Grid item key={id} xs={12} alignItems="flex-start">
          <Contact
            id={id}
            name={name}
            number={number}
            handleEditContact={handleEditContact}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ContactList;
