import React from 'react'
import styles from '../css/Button.module.css'

const Button = ({ children, ...props }) => {
  return (
    <button className={ styles.button } { ...props }>
      { children } 
    </button>
  )
}

export default Button