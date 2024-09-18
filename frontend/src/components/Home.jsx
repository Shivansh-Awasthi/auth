import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = () => {

    const [name, setName] = useState("")
    const [data, setData] = useState([])

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("name")
        localStorage.removeItem("token")
        setTimeout(() => {
            navigate("/login")
        }, 1000);
    }

    useEffect(() => {
        setName(localStorage.getItem("name"))
    }, [])


    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
        console.log(token);

        if (!token) {
            console.log("Token not found");
            return;
        }
        const res = await axios.get("http://localhost:8080/products", {
            headers: {
                Authorization: token
            }
        })
        console.log(res.data);

        setData(res.data);

    }
    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <div>
            <h1>Welcome!! {name}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div> {data.map((e, i) => {
                return <div key={i} >
                    <h2>{e.name}</h2> <br />
                    <h3>{e.price}</h3>
                </div>
            })}</div>
        </div>
    )
}

export default Home