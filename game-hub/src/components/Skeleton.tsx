import styles from './Skeleton.module.css'

function Skeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.body}>
        <div className={styles.lineLg} />
        <div className={styles.lineMd} />
        <div className={styles.row}>
          <div className={styles.pill} />
          <div className={styles.pill} />
          <div className={styles.pill} />
        </div>
      </div>
    </div>
  )
}

export default Skeleton
