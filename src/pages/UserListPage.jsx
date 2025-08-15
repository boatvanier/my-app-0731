import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
  return data;
};

const deleteUser = async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  return id;
};

function UserListPage() {
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Delete mutation
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Refresh list after delete
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.5,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          disabled={mutation.isLoading}
          onClick={() => mutation.mutate(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users.</p>;

  return (
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        disableSelectionOnClick
        getRowId={(row) => row.id}
      />
  );
}
export default UserListPage