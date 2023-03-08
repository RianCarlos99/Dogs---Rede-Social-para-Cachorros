import React from 'react'
import FeedPhotosItem from './FeedPhotosItem'
import useFetch from '../../Hooks/useFetch'
import { PHOTOS_GET } from '../../Api/Api'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'
import styles from '../css/FeedPhotos.module.css'

const FeedPhotos = ({ setModalPhoto, user, page, setInfinite }) => {
  const { data, loading, erro, request } = useFetch()

  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6
      const { url, options } = PHOTOS_GET({ page: page, total: total, user: user })
      const { response, json } = await request(url, options)
      
      if(response && response.ok && json.length < total )  setInfinite(false)
    }

    fetchPhotos()
  }, [request, user, page, setInfinite])

  if (erro) return <Error error={erro} />
  if (loading) return <Loading />

  if (data)
    return (
      <ul className={ `${styles.feed} animeLeft` }>
        {data.map((photo) => (
          <FeedPhotosItem key={photo.id} photo={photo} setModalPhoto={ setModalPhoto }/>
        ))}
      </ul>
    )
  else return null
}

export default FeedPhotos
