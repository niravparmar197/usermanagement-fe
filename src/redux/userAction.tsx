import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./apis";
import { toast } from "react-toastify";

interface UserDataType {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
}

interface FilterDataType {
  page?: number;
  search?: string;
  limit?: number;
}

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (userFilter: FilterDataType | null = null) => {
    try {
      let str = "";
      if (userFilter) {
        str = `?page=${userFilter?.page}&limit=${userFilter?.limit}&search=${userFilter?.search}`;
      }
      const response = await API.get(`users${str}`);

      return response.data;
    } catch (error:any) {
      toast.error(error?.response?.data?.message[0] || "Something went wrong");

    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (user: UserDataType) => {
    try {
      const response = await API.post("users", user);
      toast.success("User added successfully");

      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message[0] || "Something went wrong");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: UserDataType) => {
    try {
      const response = await API.patch(`users/${user._id}`, user);
      toast.success("User updated successfully");

      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message[0] || "Something went wrong");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId: string) => {
    try {
      const response = await API.delete(`users/${userId}`);
      toast.success("User deleted successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message[0] || "Something went wrong");
    }
  }
);
