"use client"

import styles from "@/css/register.module.css"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

const Register = () => {
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
            const existUser = await fetch("/api/existuser", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    name, email
                })
            })

            const response = await existUser.json();

            if(response.check){
                setError("User exists");
                return;
            }

            const data = await fetch("/api/register", {
                method: "POST", 
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ 
                    name, 
                    email, 
                    password
                })
            })

            if (data.ok){
                setName("");
                setEmail("");
                setPassword("");
                // const form = e.target as HTMLFormElement;
                // form.reset(); 
                router.push("/login");
            } else {
                console.log("Registration failed");
            }
        } catch (error) {
            console.log("Error during registration");
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Register Form</h1>
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
                    <button className={styles.button} type="submit">register</button>
                    <Link href="/login">Already have account?</Link>
                </div>
            </form>
        </div>
    )
}

export default Register