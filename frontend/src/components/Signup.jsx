import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        setName("");
        setEmail("");
        setPassword("");

        const res = await axios.post("http://localhost:8080/api/signup", {
            name,
            email,
            password
        })
        navigate("/login")
    }


    return (
        <div>
            <div className='container'>
                <h1>Signup</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='enter your name' value={name} onChange={handleName} autoFocus />
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='enter your email' value={email} onChange={handleEmail} />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder='choose your password' value={password} onChange={handlePassword} />
                    </div>
                    <button type='submit'>Signup</button> <br />
                    <span>Already have an account?
                        <Link to='/login'> Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup