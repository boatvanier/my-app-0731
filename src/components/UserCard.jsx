import {
    Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  CardActions,
} from "@mui/material";
import {Link} from "react-router-dom"

function UserCard({ user, handleDelete }) {

  return (
    <Card sx={{ maxWidth: 600, m: 2, borderRadius: 3, boxShadow: 3 }}>
      <Link to={`/users/${user.id}/edit`}>
        <CardHeader
          title={user.name}
          subheader={user.username}
          sx={{
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #ddd",
          }}
        />
      </Link>
      <CardContent>
        {/* Email */}
        <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> {user.email}
        </Typography>

        {/* Company */}
        <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Company:</strong> {user.company.name}
        </Typography>

        {/* Address */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Address:</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
         <Button  
          sx={{ mt: 2 }}
            variant="contained"
            color="error" 
            onClick={handleDelete}>
             Delete User
        </Button>
      </CardActions>
    </Card>
  );
}
export default UserCard