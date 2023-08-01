import MessageBox from '../MessageBox';
import styles from './Container.module.css';

export default function Container({children, centralizar}){

  return(
    <div className={styles.container}>
      <div className={styles.margemContainer+" "+styles[(centralizar == true) && "centralizar"]}>
        {children}
        <MessageBox/>
      </div>
    </div>
  );
}