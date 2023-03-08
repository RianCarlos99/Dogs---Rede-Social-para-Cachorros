import React from 'react'
import styles from '../css/FeedPhotosItem.module.css'
import Image from '../Helper/Image'

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  
  return <li className={ styles.photo } onClick={()=>{ setModalPhoto(photo) }}>
    <Image  src={ photo.src } alt={ photo.title } />
    <span className={ styles.visualization }>{ photo.acessos }</span>
  </li>
}

export default FeedPhotosItem