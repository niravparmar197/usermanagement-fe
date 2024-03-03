import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import AddEditUserModal from "./AddEditUserModal";
import { debounce } from "lodash";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModal from "./DeleteModal";
import { getUsers } from "../../redux/userAction";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";

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

export default function UserList() {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [searchQuery] = useState();
  const [editData, setEditData] = useState<UserDataType | null>(null);
  const [filterData, setFilterData] = useState({
    page: 0,
    limit: 5,
    search: "",
  } as FilterDataType);
  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setEditData(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };

  const search = (query: string) => {
    const newFilterData: FilterDataType = { ...filterData, search: query };
    setFilterData(newFilterData);
    dispatch(getUsers(newFilterData));
  };

  const debouncedSearch = useMemo(() => debounce(search, 500), []);

  const handleEdit = (data: UserDataType) => {
    setEditData(data);
    setOpen(true);
  };

  const handleDelete = (data: UserDataType) => {
    setEditData(data);
    setDeleteOpen(true);
  };

  useEffect(() => {
    dispatch(getUsers(null));
  }, [dispatch]);

  const { values, count } = useAppSelector(
    (state: RootState) => state.user.list
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    const newFilterData: FilterDataType = {
      ...filterData,
      page: Number(newPage),
    };
    setFilterData(newFilterData);
    dispatch(getUsers(newFilterData));
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFilterData: FilterDataType = {
      ...filterData,
      limit: Number(event?.target?.value),
    };
    setFilterData(newFilterData);
    dispatch(getUsers(newFilterData));
  };

  return (
    <>
      {open && (
        <AddEditUserModal
          open={open}
          handleClose={handleClose}
          editData={editData}
        />
      )}
      {deleteOpen && (
        <DeleteModal
          open={deleteOpen}
          handleClose={handleCloseDelete}
          editData={editData}
        />
      )}
      <TextField
        id="search-bar"
        value={searchQuery}
        onChange={handleSearchChange}
        label="Search"
        variant="outlined"
        size="small"
      />
      <Button
        variant="contained"
        style={{ marginLeft: "753px" }}
        onClick={handleClickOpen}
      >
        Add User
      </Button>

      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values &&
              values.map((user: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={user?._id}>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.mobileNumber}</TableCell>

                  <TableCell>
                    <>
                      <EditIcon onClick={() => handleEdit(user)} />
                      <DeleteIcon onClick={() => handleDelete(user)} />
                    </>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={Number(filterData?.limit)}
        page={Number(filterData?.page)}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
