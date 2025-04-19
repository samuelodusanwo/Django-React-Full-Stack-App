import { useState, useEffect, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/constants'
import api from '../../api/api'
import { jwtDecode } from 'jwt-decode'


function ProtectedRoute({children}) {
    const [ isAuthorized, setIsAuthorized ] = useState(null)

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        try {
            const res = await api.post("/api/token/refresh/", {refresh: refreshToken})
            if(res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = useCallback(async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)

        if (!token){
            setIsAuthorized(false)
            return
        }

        const decoded = jwtDecode(token)
        const decodedExpiration = decoded.exp
        const now = Date.now() / 1000
        const bufferTime = 60

        if (decodedExpiration - now < bufferTime) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }, [])

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [auth])

    if(isAuthorized === null){
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute;