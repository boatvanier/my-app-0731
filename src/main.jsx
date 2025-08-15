import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserEditPage from './pages/UserEditPage.jsx'
import UserListPage from './pages/UserListPage.jsx'
import UsersPage from './pages/UsersPage.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserListPage />
    </QueryClientProvider>
  </StrictMode>
)
