"use client"

import styles from "@/css/login.module.css"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { signIn } from "next-auth/react";

const Login = () => {
    const [error, setError] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!name || !email || !password){
            setError("please input all information!")
            return;
        } else {
            setError("");   
        }

        try {
            const data = await signIn("credentials", {
                email, password, redirect: false
            })

            if(data?.error){
                setError("Invalid Credentials");
                return;
            }

            router.replace("/dashboard")
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login Form</h1>
            <form className={styles.form} onClick={handleSubmit}>
                <div className={styles.inputfield}> 
                    <label htmlFor="username">username: </label>
                    <input 
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        type="text" 
                        placeholder='fullname'
                        className={styles.input} 
                    />
                </div>
                <div className={styles.inputfield}> 
                    <label htmlFor="email">email: </label>
                    <input 
                        className={styles.input} 
                        type="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='email'
                    />
                </div>
                <div className={styles.inputfield}>
                    <label htmlFor="password">password: </label>
                    <input 
                        className={styles.input} 
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='password'
                    />
                </div>
                {
                    error && (
                        <p className={styles.error}>{error}</p>
                    )
                }
                <div className={styles.end}>
                    <button className={styles.button} type="submit">Log in</button>
                    <Link href="/register">Do not have account?</Link>
                </div>
            </form>
        </div>
    )
}

export default Login