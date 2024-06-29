import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/filtersSlice";
import { contactsSlice } from "./slice";

export const selectContacts = (state) => state.contacts.contacts.items;
export const selectIsLoading = (state) => state.contacts.contacts.isLoading;
export const selectIsError = (state) => state.contacts.contacts.isError;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (items, { name }) =>
    items.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
);

export const contactsReducer = contactsSlice.reducer;
