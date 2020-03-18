import axios from "axios"

const initialState = []

const FETCH_TEMPLATE_DATA_PENDING = "FETCH_TEMPLATE_DATA_PENDING"
const FETCH_TEMPLATE_DATA_FULLFILLED = "FETCH_TEMPLATE_DATA_FULLFILLED"
const FETCH_TEMPLATE_DATA_REJECTED = "FETCH_TEMPLATE_DATA_REJECTED"

export const fetchTemplates =() =>{
    return (dispatch, getState)=>{
        dispatch({type:FETCH_TEMPLATE_DATA_PENDING})

        axios.get('/api/templates/')
          .then((res) => {
            dispatch({type:FETCH_TEMPLATE_DATA_FULLFILLED, payload:res.data})
          })
          .catch((err) => {
            dispatch({type:FETCH_TEMPLATE_DATA_REJECTED, payload:err})

          })
    }
}


export const templateReducer = (state = initialState, action) => {
    switch(action.type){

        case FETCH_TEMPLATE_DATA_FULLFILLED:
            return  action.payload

    }
    return state
}