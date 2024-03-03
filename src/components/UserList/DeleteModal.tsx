import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteUser } from "../../redux/userAction";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";

interface UserDataType {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
}

interface DeleteUserModalProps {
  open: boolean;
  handleClose: () => void;
  editData?: UserDataType | null;
}

export default function DeleteModal({
  open,
  handleClose,
  editData,
}: DeleteUserModalProps) {
  const isDeleting = useAppSelector(
    (state: RootState) => state.user.save.isDeleting
  );

  const dispatch = useAppDispatch();

  const handleDeleteSubmit = () => {
    if (editData) {
      dispatch(deleteUser(editData._id));
      handleClose();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteSubmit} autoFocus>
            {isDeleting ? <CircularProgress /> : null} Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
