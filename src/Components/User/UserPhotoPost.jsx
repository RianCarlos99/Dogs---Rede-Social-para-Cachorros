import React from 'react'
import styles from '../css/UserPhotoPost.module.css'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import { PHOTO_POST } from '../../Api/Api'
import Error from '../Helper/Error'
import { useNavigate } from 'react-router-dom'
import Head from '../Helper/Head'

const UserPhotoPost = () => {
  const nome = useForm()
  const peso = useForm('number')
  const idade = useForm('number')
  const [img, setImg] = React.useState({})
  const { data, erro, request, loading } = useFetch()
  const navigate = useNavigate()

  React.useEffect(()=> {
    if(data) navigate('/conta')
  }, [data, navigate])



  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData()
    formData.append('img', img.raw)
    formData.append('nome', nome.value)
    formData.append('peso', peso.value)
    formData.append('idade', idade.value)

    const token = window.localStorage.getItem('token')
    const { url, options } = PHOTO_POST(formData, token)
    request(url, options)
  }

  function handleImgChange({ target }) {
    setImg({
      raw: target.files[0],
      preview: URL.createObjectURL(target.files[0]),
    })
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title='Poste sua foto' description=''/>

      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" id="nome" {...nome} />
        <Input label="Peso" type="number" id="peso" {...peso} />

        <Input label="Idade" type="number" id="idade" {...idade} />

        <Input label="Img" type="file" id="img" onChange={handleImgChange} />

        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}

        <Error erro={ erro }/>
      </form>

      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  )
}

export default UserPhotoPost
