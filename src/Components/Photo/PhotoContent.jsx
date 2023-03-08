import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import styles from '../css/PhotoContent.module.css'
import PhotoComments from './PhotoComments'
import PhotoDelete from './PhotoDelete'
import Image from '../Helper/Image'

const PhotoContent = ({ data, single }) => {
  const user = React.useContext(UserContext)
  const { photo, comments } = data
  if(single === false) document.documentElement.style.overflow = 'hidden';

  return (
    <div className={`${ styles.photo } ${ single ? styles.single : '' }`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}> 
            {user.data && user.data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}

            <span className={styles.visualizations}>{photo.acessos}</span>
          </p>

          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>

          <ul className={styles.attributes}>
            <li>{photo.peso} Kg</li>
            <li>{photo.idade} anos</li>
          </ul>

        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} />
    </div>
  )
}

export default PhotoContent
