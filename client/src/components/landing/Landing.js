import { Link } from 'react-router-dom';
import styles from './landing.module.css'

function Landing () { 
    return (
    <div>
    <div className={styles.margin}> 
    <h1 className={styles.font}> Welcome to Henry's Web of dogs </h1>
    </div>
    <div className={styles.padding}> 
    <h4 className={styles.font2}> Follow the footsteps </h4>
   </div>
   <Link to = '/home'>
       <button  className={styles.margin}>🐾</button>
   </Link>
   <div>
   <img url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYDfVfu_GsEyMcmge4AQYQaha2VYuN2-P-Vg&usqp=CAU" alt="" width="250" height="300" />
   </div>
   </div>
    );
};

export default Landing;