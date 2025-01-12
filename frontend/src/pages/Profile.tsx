import React, {useEffect, useState} from "react"
import {fetchHelloMessage} from "../api/axiosConfig"


const Profile = () => {
    const [message, setMessage] = useState()

    useEffect(()=>{
        const getMessage = async () => {
            try{
                const data = await fetchHelloMessage()
                setMessage(data.message)
            }catch(error){
                console.error(error)
            }
        }
        getMessage()
    }, [])

    return (
        <>
            <h2>Profile</h2>
            <p>{message}</p>
        </>
    )
}

export default Profile