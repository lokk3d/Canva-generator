import axios from "axios"

const initialState = {
    firstName:"",
    lastName:"",
    email:"",
}

const FETCH_USER_DATA_PENDING = "FETCH_USER_DATA_PENDING"
const FETCH_USER_DATA_FULLFILLED = "FETCH_USER_DATA_FULLFILLED"
const FETCH_USER_DATA_REJECTED = "FETCH_USER_DATA_REJECTED"

export const fetchUserData =() =>{
    return (dispatch, getState)=>{
        dispatch({type:FETCH_USER_DATA_PENDING})

        axios.get('/api/user/',
        { headers: { authorization: "Bearer " + getState().auth.token } })
          .then((res) => {
            dispatch({type:FETCH_USER_DATA_FULLFILLED, payload:res.data})
          })
          .catch((err) => {
            dispatch({type:FETCH_USER_DATA_REJECTED, payload:err})

          })
    }
}


export const userReducer = (state = initialState, action) => {
    switch(action.type){

        case FETCH_USER_DATA_FULLFILLED:
            return {...state, firstName: action.payload.firstName, lastName: action.payload.lastName, email: action.payload.email}

    }
    return state
}