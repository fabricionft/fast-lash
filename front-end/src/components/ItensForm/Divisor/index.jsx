import styles from './Divisor.module.css';

export default function Divisor({children}){

  return(
    <div className={styles.divisor}>
      {children}
    </div>
  );
}