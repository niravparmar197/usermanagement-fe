import UserList from "./components/UserList/UserList";
import { Box, Container } from "@mui/material";

export interface UserInterface {
  _id: string;
  name?: string;
  email?: string;
  mobileNumber?: string;
  password?: string;
}

const App = () => {
  return (
    <main className="">
      <Container>
        <Box sx={{ my: 5 }}>
          <UserList />
        </Box>
      </Container>
    </main>
  );
};

export default App;
