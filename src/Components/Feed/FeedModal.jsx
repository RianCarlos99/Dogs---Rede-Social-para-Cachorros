import React from 'react'
import { PHOTO_GET } from '../../Api/Api'
import useFetch from '../../Hooks/useFetch'
import styles from '../css/FeedModal.module.css'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'
import PhotoContent from '../Photo/PhotoContent'

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, erro, request, loading } = useFetch()

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id)
    request(url, options)
  }, [photo, request])

  function handleOutsideClick(event) {
    if(event.target === event.currentTarget) {
      setModalPhoto(null)
      document.documentElement.style.overflowY = 'scroll';
    }
  }

  return (
    <div className={styles.modal} onClick={ handleOutsideClick }>
      {erro && <Error error={erro} />}
      {loading && <Loading />}
      {data && <PhotoContent data={ data } single={ false }/>}
    </div>
  )
}

export default FeedModal
