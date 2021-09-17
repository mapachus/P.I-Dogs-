import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getDogs, getByCreated, getByAlphabet, getByWeight, getTemperaments, getByTemperaments } from '../../redux/actions';

import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

import styles from './index.module.css';

export default function Home () {

const dispatch = useDispatch();
const allDogs = useSelector((state) => state.dogs)
const [currentPage, setCurrentPage] = useState(1);
const [dogsPerPage, setDogsPerPage] = useState(8);
const indexLastDog = currentPage * dogsPerPage;
const indexFirstDog = indexLastDog - dogsPerPage;
const dogsPage = allDogs.slice(indexFirstDog, indexLastDog);

const [order, setOrder] = useState('');
const temperaments = useSelector(state => state.temperaments)

useEffect (() => {
    dispatch(getDogs());
    },[dispatch])

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
    };


function handleCreated(e) {
    console.log("dispatch gBC", e.target.value)
    e.preventDefault();
    dispatch(getByCreated(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
};

function handleAlphabet(e) {
    e.preventDefault();
    dispatch(getByAlphabet(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
    };

function handleWeight(e) {
    e.preventDefault();
    dispatch(getByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
};

function handleReset (e) {
    e.preventDefault();
    dispatch(getDogs());
}

 useEffect(() => {
 dispatch(getTemperaments());
 }, [dispatch])

function handleTemperaments (e) {
    console.log("dispatch gBT", e.target.value);
     e.preventDefault();
     dispatch(getByTemperaments(e.target.value));
     setCurrentPage(1);
     setOrder(`Ordenado ${e.target.value}`);


 }

    return(
        <div className = {styles.all}>
            <span //className={styles.nav}
            >
        <div className = {styles.searchbar}> 
        <SearchBar/>
               <label>filter by:</label>
               <select className={styles.inputs}
                onChange={handleCreated} >
                    <option className={styles.inputs} value="All"> CREATED </option>
                    <option className={styles.inputs} value="All">All</option>
                    <option className={styles.inputs} value="DB">DB dogs</option>
                    <option className={styles.inputs} value="Api">Api dogs</option>
                </select> 
                <select  className={styles.inputs}
                 onChange={handleAlphabet}>
                    <option className={styles.inputs}> ALPHABET  </option>
                    <option className={styles.inputs}value='Asc'>A - Z</option>
                    <option className={styles.inputs} value='Desc'>Z - A</option>
                </select>
                <select className={styles.inputs}
                 onChange={handleWeight}>
                    <option className={styles.inputs}> WEIGHT </option>
                    <option className={styles.inputs} value='aWeight'>Bigger</option>
                    <option className={styles.inputs} value='bWeight'>Smaller</option>
                </select>
                <select className={styles.inputs}
                 onChange={handleTemperaments}>
                   <option className={styles.inputs}> TEMPERAMENT </option>
                    {
                        temperaments.map(t => (
                            <option className={styles.inputs} value={t.name}>{t.name}</option>
                        ))
                    }
                </select> 
                <button className={styles.button} onClick={handleReset} >Reset</button>
                <Link to='/create'> <button className={styles.button}>Create 🐕</button></Link>
                </div>
            </span>
        <div>
        { dogsPage?.map((d) => {
        return (
            <div className = {styles.cards}>
            <Card name={d.name} temperament={d.temperament} weight={d.weight} image={d.image} id={d.id} key={d.id}></Card>
            </div>
            )})}
        </div>
        <div className={styles.paginas}>
        <Paginado paginado={paginado} 
         allDogs={allDogs.length} dogsPerPage={dogsPerPage}
        ></Paginado>
        </div>
        </div>
    )
}