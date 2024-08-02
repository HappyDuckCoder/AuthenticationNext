"use client"

import styles from "@/css/dashboard.module.css"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"

const Dashboard = () => {

    const {data: session} = useSession();
    if(!session) redirect("/register")

    const router = useRouter();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>name: {session?.user?.name}</h2>
            <h2 className={styles.title}>email: {session?.user?.email}</h2>
            <h2 className={styles.title}>id: {session?.user?.id}</h2>
            <button className={styles.button} onClick={() => signOut()}>Logout</button>
            <div className={styles.dashboard}>
                <button className={styles.button} onClick={() => {router.push("/self_todo")}}>Your List</button>
                {/* <button className={styles.button} onClick={() => {router.push("/your_team")}}>Team List</button> */}
            </div>
        </div>
    )
}

export default Dashboard