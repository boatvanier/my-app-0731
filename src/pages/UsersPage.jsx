import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserCard from '../components/UserCard'
import { useMutation, useQueryClient } from "@tanstack/react-query";

function getUsers() {
  return axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => res.data);
}
function deleteUser(id) {
  return axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
}

function UsersPage() {
  // delete user
  const queryClient = useQueryClient();    
  const mutation = useMutation({
    mutationFn: deleteUser,
    onError:(error)=>{
        alert(error.message || "error");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("user deleted");
    }
  });

  //get users
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"], // cache key
    queryFn: getUsers
  });
  
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <>
      {data.map(user => <UserCard key={user.id} user={user} handleDelete={()=>mutation.mutate(user.id)}/>)}
    </>
  );
}

export default UsersPage
