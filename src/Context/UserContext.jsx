import React, { useState } from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from '../Api/Api'
import { useNavigate } from 'react-router-dom'

export const UserContext = React.createContext()

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null)
  const [login, setLogin] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const userLogout = React.useCallback(async function() {
    setData(null)
    setError(null)
    setLoading(false)
    setLogin(false)

    window.localStorage.removeItem('token')
    navigate('/login')
  },[navigate])

  React.useEffect(()=> {
    async function autologin() {
      
      const token = window.localStorage.getItem('token')

      if(token) {
        try {

          setError(null)
          setLoading(true)

          const { url, options } = TOKEN_VALIDATE_POST(token)
          const response = await fetch(url, options)
          
          if(!response.ok) throw new Error('Token inválido!')
          
          getUser(token)

        }catch(err) {
          console.log(err.message)
          userLogout()

        }finally {
          setLoading(false)
        }
      }
    }
    
    autologin()
  }, [userLogout])

  async function getUser(token) {
    const { url, options } = USER_GET(token)
    const response = await fetch(url, options)
    const json = await response.json()

    setData(json)
    setLoading(false)
    setLogin(true)
  }

  async function userLogin(username, password) {
    try {
      setError(null)
      setLoading(true)

      const { url, options } = TOKEN_POST({ username, password })
      const tokenRes = await fetch(url, options)

      if(!tokenRes.ok) throw new Error('Erro: Usuário inválido')

      const { token } = await tokenRes.json()

      window.localStorage.setItem('token', token)
      
      await getUser(token)
      navigate('/conta')

    }catch(err) {
      setError(err.message)
      setLoading(false)

    }finally {
      setLoading(false)
    }
  }

  return (
    <UserContext.Provider value={{ userLogin, data, loading, userLogout, error, login }}>
      {children}
    </UserContext.Provider>
  )
}
