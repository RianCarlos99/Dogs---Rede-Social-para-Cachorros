import React from 'react'
import { COMMENT_POST } from '../../Api/Api'
import { ReactComponent as Enviar } from '../../Assets/enviar.svg'
import useFetch from '../../Hooks/useFetch'
import Error from '../Helper/Error'
import styles from '../css/PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({ id, setComments }) => {
  
  const [comment, setComment] = React.useState('')

  const { request, erro } = useFetch()

  async function handleSubmit(event) {
    
    event.preventDefault()
    const { url, options } = COMMENT_POST(id, { comment })
    const { response, json } = await request(url, options)

    if (response.ok) {
      
      setComments((comments) => (
        [...comments, json]
      ))
      setComment('')
    }

  }

  return (
    <form onSubmit={ handleSubmit } className={ styles.form }>
      <textarea
        className={ styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={ comment }
        onChange={({ target }) => {
          setComment(target.value)
        }}
      />
      <button className={ styles.button }>
        <Enviar />
      </button>
      
      <Error error={ erro }/> 
    </form>
  )
}

export default PhotoCommentsForm
