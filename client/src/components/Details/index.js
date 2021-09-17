/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { getById } from '../../redux/actions'
import styles from './details.module.css'


export default function Details (props) {
    const dispatch = useDispatch();
    const {id} = props.match.params;
    const details = useSelector((state) => state.details);
    

    useEffect(() => {
      console.log("dispatch gBID")
        dispatch(getById(id))
    },[]);
    
    
    
    
    return (
      <div className = {styles.all}>
      {console.log("details", details)}
        {typeof details === "object" ? 
         <div>
            <div >
             <h2 className = {styles.font}>{details.name}</h2>
            </div>
            <div className = {styles.border} >
                <div  >
                <img src={details.image} className = {styles.img} alt="Not found"></img>
                </div>
                <div className = {styles.font2}>
                <h4>{details.height} cm </h4>
                <h4>{details.weight} kg </h4>
                <h4>{details.life_Expectancy}</h4>
                <h4>{details.temperament}</h4>
                </div>
              </div>  
            <div >
              <Link to ='/home'> <button className = {styles.btn}> Home </button></Link>
            </div>
        </div>:
        <div> <h2>loading</h2> </div>
    } 
    </div>
    )
}