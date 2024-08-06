import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRouter = ({ children }) => {
  const { currentUser } = useAuth()
  console.log(JSON.stringify(currentUser));
  return currentUser ? children : <Navigate to='/login' />
}

export default ProtectedRouter