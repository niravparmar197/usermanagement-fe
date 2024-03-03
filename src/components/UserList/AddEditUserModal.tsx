import { Field, Form, Formik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { TextField as FormikTextField } from "formik-mui";
import * as Yup from "yup";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../redux/userAction";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { ToastContainer, toast } from 'react-toastify';

interface UserDataType {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
}

interface AddEditUserModalProps {
  open: boolean;
  handleClose: () => void;
  editData?: UserDataType | null;
}

const UserSchemaAdd = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must be only digits")
    .min(10, "Mobile number must be at least 10 digits")
    .required("Mobile number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const UserSchemaEdit = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must be only digits")
    .min(10, "Mobile number must be at least 10 digits")
    .required("Mobile number is required"),
});

export default function AddEditUserModal({
  open,
  handleClose,
  editData,
}: AddEditUserModalProps) {
  const initialValues = editData || {
    _id: "",
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
  };
  const dispatch = useAppDispatch();

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editData ? "Edit User" : "Add User"}</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={editData ? UserSchemaEdit : UserSchemaAdd}
          onSubmit={(values, { resetForm }) => {
            // Your submit logic here
            if (editData) {
              dispatch(updateUser(values));
            } else {
              dispatch(addUser(values));
            }
            handleClose();
            resetForm();
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <DialogContent>
                <Field
                  component={FormikTextField}
                  name="name"
                  label="Name"
                  fullWidth
                  margin="dense"
                />
                <Field
                  component={FormikTextField}
                  name="email"
                  label="Email"
                  fullWidth
                  margin="dense"
                  disabled={editData ? false : false}
                />
                <Field
                  component={FormikTextField}
                  name="mobileNumber"
                  label="Mobile Number"
                  fullWidth
                  margin="dense"
                />
                {!editData && (
                  <Field
                    component={FormikTextField}
                    name="password"
                    label="Password"
                    fullWidth
                    margin="dense"
                    type="password"
                  />
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={submitForm}>
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
