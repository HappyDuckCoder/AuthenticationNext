"use client"

import styles from "@/css/dashboard.module.css"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const Dashboard = () => {

    const {data: session} = useSession();
    if(!session) redirect("/register")

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>name: {session?.user?.name}</h2>
            <h2 className={styles.title}>email: {session?.user?.email}</h2>
            <button className={styles.button} onClick={() => signOut()}>Logout</button>
        </div>
    )
}

export default Dashboard