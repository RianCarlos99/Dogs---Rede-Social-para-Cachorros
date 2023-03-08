import React from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../Feed/Feed'
import Head from '../Helper/Head'


const UserProfile = () => {
  const { user } = useParams()

  document.documentElement.style.overflowY = 'scroll';

  return (
    <section className='container MainSection'>
      <Head title={user} description=''/>
      <h1 className='title'>{ user }</h1>
      <Feed user={ user }/>
    </section>
  )
}

export default UserProfile