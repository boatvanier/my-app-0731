import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";

const getUser = async (id) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  return data;
};

const postUser = async (user) => {
  const { data } = await axios.post("https://jsonplaceholder.typicode.com/users", user);
  return data;
};
function UserEditPage() {
  const {userId} = useParams();

console.log(userId)
  // Fetch user with React Query
  const { data: userData, isError, isLoading } = useQuery({
    queryKey: ["users", userId], // cache key
    queryFn: ()=>getUser(userId)
  });
  // Local state to edit user form
  const [user, setUser] = useState(null);

  // Sync fetched data to local state
  useEffect(() => {
    if (userData) setUser(userData);
  }, [userData]);

  const mutation = useMutation({
    mutationFn: postUser, 
    onSuccess: (data) => {
      console.log("Updated user:", data);
      alert("user updated")
    },
    onError: (error) => {
      console.error("Failed to update user:", error);
      alert("failed")
    },
  });

  const handleChange = (field, value) => {
    if (["street", "suite", "city", "zipcode"].includes(field)) {
      setUser((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setUser((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(user);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Failed to load user</Typography>;
  if (!user) return null; // Or some fallback

  return (
    <Paper sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Edit User
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          value={user.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
        />
        <TextField
          label="Street"
          value={user.address?.street || ""}
          onChange={(e) => handleChange("street", e.target.value)}
          fullWidth
        />
        <TextField
          label="Suite"
          value={user.address?.suite || ""}
          onChange={(e) => handleChange("suite", e.target.value)}
          fullWidth
        />
        <TextField
          label="City"
          value={user.address?.city || ""}
          onChange={(e) => handleChange("city", e.target.value)}
          fullWidth
        />
        <TextField
          label="Zipcode"
          value={user.address?.zipcode || ""}
          onChange={(e) => handleChange("zipcode", e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Saving..." : "Save"}
        </Button>
      </Box>
    </Paper>
  );
}

export default UserEditPage