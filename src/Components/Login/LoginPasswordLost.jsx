import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import { PASSWORD_LOST } from '../../Api/Api'
import Error from '../Helper/Error'
import Head from '../Helper/Head'

const LoginPasswordLost = () => {
  const login = useForm()
  const { data, loading, request, erro } = useFetch()

  async function handleSubmit(event) {
    event.preventDefault()

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar'),
      })
      await request(url, options)
    }
  }

  return (
    <section className='animeLeft'>
      <Head title='Perdeu a senha' description=''/>

      <h1 className="title">Perdeu a senha?</h1>

      {data ? (
        <h2 style={{ color: '#4c1' }}>{data}</h2>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" id="email" {...login} />

          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}

          <Error error={erro} />
        </form>
      )}
    </section>
  )
}

export default LoginPasswordLost
