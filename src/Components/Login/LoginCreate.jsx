import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import { USER_POST } from '../../Api/Api'
import { UserContext } from '../../Context/UserContext'
import useFetch from '../../Hooks/useFetch'
import Error from '../Helper/Error'
import Head from '../Helper/Head'

const LoginCreate = () => {
  const username = useForm()
  const email = useForm('email')
  const password = useForm()

  const { userLogin } = React.useContext(UserContext)
  const { request, erro, loading } = useFetch()

  async function handleSubmit(event) {
    event.preventDefault()

    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    })
    
    const { response } = await request(url, options)
    
    if (response.ok) {
      userLogin(username.value, password.value)
    }
  }

  return (
    <section className="animeLeft">
      <Head title='Crie sua conta' description=''/>

      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" id="username" {...username} />
        <Input label="Email" type="email" id="email" {...email} />
        <Input label="Senha" type="password" id="password" {...password} />

        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}

        <Error error={ erro } />
      </form>
    </section>
  )
}

export default LoginCreate
