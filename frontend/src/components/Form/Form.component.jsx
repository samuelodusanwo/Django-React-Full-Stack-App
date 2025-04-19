import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/constants'
import api from '../../api/api'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator.component'

import './Form.styles.scss'


function Form({ route, method }) {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, { username, password })
            if (method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
                className='form-input'
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className='form-input'
            />

            {loading && <LoadingIndicator />}
            <button className="form-button" type='submit' disabled={loading}>
                {name}
            </button>
        </form>
    )
}

export default Form;