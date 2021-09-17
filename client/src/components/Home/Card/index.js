import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Card.module.css';


function Card ({name, temperament, weight, image, id}) {
  
    return(
        <div className = {styles.card}>
         <Link to={'/details/' + id}>
           <img src={image} alt="" className = {styles.img} />
           </Link>
            <h4>{name}</h4>
<h7>{ Array.isArray(temperament)? temperament.map((t) => <label> {t.name}</label>): temperament} </h7>
            <h6>{weight}kg</h6> 
        </div>
    )
}

export default Card;