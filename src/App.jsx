import React , { Fragment, useEffect } from "react"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UsersPage from "./pages/UsersPage"
import UserListPage from "./pages/UserListPage"
import UserEditPage from "./pages/UserEditPage"
import HomePage from "./pages/HomePage"
import Layout from "./layout/Layout"

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage/>} />
          <Route path="/users" element={<UsersPage/>} />
          <Route path="/userslist" element={<UserListPage/>} />
          <Route path="/users/:userId/edit" element={<UserEditPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
