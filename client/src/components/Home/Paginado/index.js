import React from "react";

import styles from "./paginado.module.css"

export default function Paginado({paginado, allDogs, dogsPerPage}) {

const pageNumbers = []    

for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
     pageNumbers.push(i)
     }
    
return(
        <nav >
        <span>
        { pageNumbers && 
        pageNumbers.map(number =>(
        <button className={styles.button} href onClick={() => paginado(number)}>{number}</button>
        ))}
        </span>
        </nav>
        )
};





