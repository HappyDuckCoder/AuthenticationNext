import styles from "@/css/home.module.css"
import Link from "next/link"


const HomePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to my app</h1>
        <div className={styles.buttondiv}>
          <button className={styles.button}>
            <Link href="/register">Register</Link>
          </button>
          <button className={styles.button}>
            <Link href="/login">login</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage