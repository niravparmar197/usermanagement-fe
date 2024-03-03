import { createSlice } from "@reduxjs/toolkit";
import { addUser, deleteUser, getUsers, updateUser } from "./userAction";

interface User {
  password?: string | undefined;
  _id?: string | undefined;
  name: string;
  email: string;
  mobileNumber: string;
}

interface ListState {
  isLoading: boolean;
  status: string;
  pageNumber: number;
  count: number;
  values: User[];
}

interface SaveState {
  isSaving: boolean;
  isDeleting: boolean;
}

interface UsersState {
  list: ListState;
  save: SaveState;
}

const initialState: UsersState = {
  list: {
    isLoading: false,
    status: "",
    pageNumber: 1,
    count: 5,
    values: [],
  },
  save: {
    isSaving: false,
    isDeleting: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducers for synchronous actions can be added here
  },
  extraReducers: (builder) => {
    builder
      // Handling getUsers async actions
      .addCase(getUsers.pending, (state) => {
        state.list.isLoading = true;
        state.list.status = "pending";
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.list.isLoading = false;
        state.list.status = "success";
        if (payload.data) {
          state.list.values = payload.data;
        }
        state.list.pageNumber = payload.pageNumber;
        state.list.count = payload.count;
      })
      .addCase(getUsers.rejected, (state) => {
        state.list.isLoading = false;
        state.list.status = "failed";
      })
      // Handling addUser async actions
      .addCase(addUser.pending, (state) => {
        state.save.isSaving = true;
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        state.save.isSaving = false;
        if (!!payload) {
          state.list.values.push(payload);
        }
      })
      .addCase(addUser.rejected, (state) => {
        state.save.isSaving = false;
      })
      // Handling updateUser async actions
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        if (!!payload) {
          const index = state?.list?.values.findIndex(
            (user) => user?._id === payload?._id
          );
          if (index !== -1) {
            state.list.values[index] = payload;
          }
        }
      })
      // Handling deleteUser async actions
      .addCase(deleteUser.pending, (state) => {
        state.save.isDeleting = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.list.values = state.list.values.filter(
          (user) => user._id !== payload._id
        ); // Assuming the payload is the id of the user to delete
        state.save.isDeleting = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.save.isDeleting = false;
      });
  },
});

export default userSlice;
