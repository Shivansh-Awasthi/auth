import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        setEmail("");
        setPassword("");

        const res = await axios.post("http://localhost:8080/api/login", {
            email,
            password
        })
        const token = res.data.token;
        const name = res.data.name
        localStorage.setItem('token', token)
        localStorage.setItem('name', name)
        navigate('/home')
    }


    return (
        <div>
            <div className='container'>
                <h1>Login</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='enter your email' value={email} onChange={handleEmail} />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder='choose your password' value={password} onChange={handlePassword} />
                    </div>
                    <button type='submit'>Signup</button> <br />
                    <span>Don't have an account?
                        <Link to='/signup'> Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login