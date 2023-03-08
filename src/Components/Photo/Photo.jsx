import React from 'react'
import { useParams } from 'react-router-dom'
import { PHOTO_GET } from '../../Api/Api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from './PhotoContent';
import Head from '../Helper/Head';

const Photo = () => {
  const { id } = useParams();
  const { data, loading, erro, request} = useFetch();
  
  document.documentElement.style.overflowY = 'scroll';

  React.useEffect(()=> {
    const { url, options } = PHOTO_GET(id)
    request(url, options)

  }, [id, request])

  if(erro) return <Error error={ erro } />
  if(loading) return <Loading />
  
  if(data) return <section className='container mainContainer'>
      <Head title={ data.photo.title } description=''/>
    <PhotoContent single={ true } data={ data }/>
  </section>

  else return null
}

export default Photo