import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import Feed from '../Feed/Feed'
import NotFound from '../NotFound'
import UserHeader from './UserHeader'
import UserPhotoPost from './UserPhotoPost'
import UserStats from './UserStats'
import Head from '../Helper/Head'

const User = () => {
  const { data } = React.useContext(UserContext)
  
  return <section className='container'>
      <Head title={ data.username } description=''/>
    <UserHeader />
    <Routes>
      <Route path='/' element={ <Feed user={ data.id }/>}/>
      <Route path='postar' element={ <UserPhotoPost />}/>
      <Route path='estatisticas' element={ <UserStats />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </section>
}

export default User