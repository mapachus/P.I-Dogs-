import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { postDog, getTemperaments } from '../../redux/actions';
import styles from './create.module.css'

export default function Create () {

const dispatch = useDispatch();
const temperaments = useSelector(state => state.temperaments)
const [input, setInput] = useState({
        name: '',
        lifespan: '',
        height: '',
        weight:'',
        image: '',
        temperament: []
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
    };



    function handleSubmit(e) {
        console.log("dispatch", input)
        e.preventDefault();
        dispatch(postDog(input))
        alert("Breed added!")
        setInput({
            name: '',
            height: '',
            weight: '', 
            lifespan: '',
            image: '',
            temperament:[]
        });
       
    };

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch])

  

    return(
        <div className={styles.background}>
            <h2 className = {styles.font}>Create your dog</h2>
            <form className = {styles.form} onSubmit={handleSubmit} >
                <div className = {styles.divs}>
                    <label>Name:</label>
                    <div>
                    <input className={styles.inputs} type='text' value={input.name} name='name'
                      required="required" onChange={handleChange}>  
                    </input>
                    </div>
                </div>
                <div className = {styles.divs}>
                    <label>height:</label>
                    <div>
                    <input className={styles.inputs} type='number' min="1" value={input.heightMin} name='height'
                     required="required" placeholder="cm" onChange={handleChange}>  
                    </input>
                    </div>
                </div>
                <div className = {styles.divs}>
                    <label>weight:</label>
                    <div>
                    <input className={styles.inputs} type='number' min="1" value={input.weightMin} name='weight'
                      required="required" placeholder="kg" onChange={handleChange}>  
                    </input>
                    </div>
                </div>
                <div className = {styles.divs}>
                    <label>lifespan:</label>
                    <div>
                    <input className={styles.inputs} type='number' min="1" value={input.lifespan} name='lifespan'
                      required="required" placeholder="years" onChange={handleChange}>  
                    </input>
                    </div>
                </div>
                <div className = {styles.divs}>
                <label>image:</label>
                <div>
                <input className={styles.inputs} type="text" value={input.image} name="image" 
                 required="required" placeholder="paste url here" onChange={handleChange}/>
                </div>
                </div>
                 <div>
                {input.temperament.map((t) => <p> {t}</p>)}
                <select  onChange={(e) => setInput({...input, temperament: [...input.temperament,e.target.value]})}   className={styles.inputs}>
                    {
                        temperaments.map(t => (
                           
                            <option className={styles.inputs}  value={t.name}> {t.name} </option>
                            
                        ))
                    }
                </select>
                </div> 
                <div>
                <button className={styles.button} type='submit' value="submit" 
                disabled={!(input.name && input.weight  && input.height && input.temperament && input.lifespan)}
                >Create</button>
                </div> 
               <div>
              <Link to ='/home'> <button className={styles.button}> Home </button></Link>
            </div>
         </form>
        </div>
    );
};
