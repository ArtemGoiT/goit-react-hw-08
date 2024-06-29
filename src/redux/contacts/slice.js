import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "./operations"; // Добавляем updateContact

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    isError: false,
  },
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.contacts.items = state.contacts.items.filter(
          (item) => item.id !== payload.id
        );
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        const indexToUpdate = state.contacts.items.findIndex(
          ({ id }) => id === payload.id
        );
        if (indexToUpdate !== -1) {
          state.contacts.items[indexToUpdate] = payload;
        }
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending,
          updateContact.pending // Добавляем updateContact.pending
        ),
        (state) => {
          state.contacts.isLoading = true;
          state.contacts.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          addContact.fulfilled,
          deleteContact.fulfilled,
          updateContact.fulfilled // Добавляем updateContact.fulfilled
        ),
        (state) => {
          state.contacts.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected,
          updateContact.rejected // Добавляем updateContact.rejected
        ),
        (state, action) => {
          state.contacts.isLoading = false;
          state.contacts.isError = true;
          toast.error(action.payload || "This didn't work.");
        }
      );
  },
});
export const contactsReducer = contactsSlice.reducer;
