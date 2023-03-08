import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

const ProtectedRoute = ({ children }) => {
 
  const { login } = React.useContext(UserContext)
  
  if(login === null) return null
  return login ? children : <Navigate to="/login" />
}

export default ProtectedRoute
