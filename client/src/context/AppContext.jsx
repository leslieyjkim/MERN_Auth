import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)

    const getAuthState = async ()=> {
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    //get userData from backend to show them on frontend page.
    const getUserData = async ()=> {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)

        } catch (error) {
            toast.error(error.message)
        }
    }
    //whenever we load webpage, it will check the auth status, and it will get user detail.
    useEffect(()=>{
        getAuthState();
    },[])

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}