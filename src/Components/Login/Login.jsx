import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginCreate from './LoginCreate'
import LoginForm from './LoginForm'
import LoginPasswordLost from './LoginPasswordLost'
import LoginPasswordReset from './LoginPasswordReset'
import styles from '../css/Login.module.css'
import { UserContext } from '../../Context/UserContext'
import NotFound from '../NotFound'

const Login = () => {
  const { login } = React.useContext(UserContext)

  if(login === true) return <Navigate to="/conta"/>
  
  return <section className={ styles.login }>
    <div className={ styles.forms }>
      <Routes>
        <Route path='/' element={<LoginForm />}/>
        <Route path='criar' element={<LoginCreate />}/>
        <Route path='perdeu' element={<LoginPasswordLost />}/>
        <Route path='resetar' element={<LoginPasswordReset />}/>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  </section>
}

export default Login