import axios from "axios"
import { logOut, getToken, setToken } from "./authService"

/* Funzione deprecata...
const SET_TOKEN = "SET_TOKEN"
export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: {
            token
        }
    }
}
*/

const LOAD_TOKEN_FULLFILLED = "LOAD_TOKEN_FULLFILLED"
const LOAD_TOKEN_REJECTED = "LOAD_TOKEN_REJECTED"
export const loadToken = () => {
    const token = getToken()
    if (typeof token === "undefined") {
        return {
            type: LOAD_TOKEN_REJECTED,
        }
    }

    return {
        type: LOAD_TOKEN_FULLFILLED,
        payload: {
            token
        }
    }
}

const LOG_IN_PENDING = "LOG_IN_PENDING"
const LOG_IN_REJECTED = "LOG_IN_REJECTED"
export const login = (email, password) => {
    return (dispatch) => {
        console.log(email + " " + password)
        dispatch( { type: LOG_IN_PENDING } )

        axios.post('/api/login',
            { email, password })
            .then((res) => {
                setToken(res.data.authToken)
                dispatch(loadToken())
            })
            .catch((err) => {
                dispatch({type: LOG_IN_REJECTED, payload:err})
            })
    }
}



const SIGN_UP_PENDING = "SIGN_UP_PENDING"
const SIGN_UP_FULLFILLED = "SIGN_UP_FULLFILLED"
const SIGN_UP_REJECTED = "SIGN_UP_REJECTED"
export const signUp = (email, password, firstName, lastName) => {
    return (dispatch) => {
        
        dispatch({ type: SIGN_UP_PENDING })

        axios.post('/api/signup',
            { email, password, firstName, lastName })
            .then((res) => {
                dispatch({type:SIGN_UP_FULLFILLED, payload:res})
            })
            .catch((err) => {
                dispatch({type: SIGN_UP_REJECTED, payload:err})
            })
    }
}

const LOG_OUT = "LOG_OUT"
export const logout = () => {
    logOut()
    return {
        type: LOG_OUT
    }
}


const initialState = {
    token: "",
    loggingIn: false,
    loggedIn: false,
    error: "",
    signup:{
        done:false,
        doing:false,
        err: ""
    }
}


export const authReducer = function (state = initialState, action) {
    switch (action.type) {
        /*
        case SET_TOKEN:
            return { ...state, token: action.payload.token }
        */
        case LOG_IN_PENDING:
            return { ...initialState }
        case LOG_IN_REJECTED:
            return { ...state, token: "", loggedIn: false, loggedIn: false, error: action.payload.message }


        case LOAD_TOKEN_FULLFILLED:
            return { ...state, token: action.payload.token, loggedIn: false, loggedIn: true }
        case LOAD_TOKEN_REJECTED:
            return { ...state, token: "", loggedIn: false, loggedIn: false }

        case LOG_OUT:
            return { ...state, token: undefined, loggedIn:false }


        case SIGN_UP_PENDING:
            return {...state, signup:{done:false, doing:true, err:""}}
        case SIGN_UP_FULLFILLED:
            return {...state, signup:{done:true, doing:false, err:""}}
        case SIGN_UP_REJECTED:
            return {...state, signup:{done:true, doing:false, err:action.payload.message}}
                          
    }
    return state
}
