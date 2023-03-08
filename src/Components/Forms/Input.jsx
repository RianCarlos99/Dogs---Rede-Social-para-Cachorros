import React from 'react'
import styles from '../css/Input.module.css'
import Error from '../Helper/Error'

const Input = ({ label, type, id, value, onChange, error, onBlur }) => {
  return (
   <div className={ styles.wrapper }>
    <label htmlFor={ id } className={ styles.label }>{ label }</label>
    <input
     className={ styles.input }
     type={ type }
     id={ id }
     name={ id }
     onChange={ onChange }
     value={ value }
     onBlur={ onBlur }
    />
    
    <Error error={ error }/>
     
   </div>
  )
}

export default Input