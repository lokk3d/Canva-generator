import axios from "axios"
import { fetchCanvas } from "../homePage/canvaListReducer"

const initialState = {
    fetched:false,
    fetching:false,
    error: "",
    data:{
        _id:"",
        title:"",
        components:[]
    },
    update:{
        done:false,
        doing:false,
        error:""
    }
}

const FETCH_CANVAS_PENDING = "FETCH_CANVAS_PENDING"
const FETCH_CANVAS_FULFILLED = "FETCH_CANVAS_FULFILLED"
const FETCH_CANVAS_REJECTED = "FETCH_CANVAS_REJECTED"
export const fetchCanva = (id) => {
    return (dispatch, getState) => {
        dispatch({type:FETCH_CANVAS_PENDING})

        axios.get('/api/canvas/'+id,
            {headers: { authorization: "Bearer " + getState().auth.token }})
          .then((res) => {
            dispatch({type:FETCH_CANVAS_FULFILLED, payload:res.data})
          })
          .catch((err) => {
            dispatch({type:FETCH_CANVAS_REJECTED, payload:err})
          })
    }
}


const UPDATE_CANVAS_PENDING = "UPDATE_CANVAS_PENDING"
const UPDATE_CANVAS_FULFILLED = "UPDATE_CANVAS_FULFILLED"
const UPDATE_CANVAS_REJECTED = "UPDATE_CANVAS_REJECTED"
export const updateCanva = (obj) => {
    return (dispatch, getState) => {
        dispatch({type:UPDATE_CANVAS_PENDING})

        const data = {
            _id:obj._id, 
            title:obj.title, 
            components: obj.components || []}

        console.log(data)

        axios.post('/api/canvas/update',data,
            {headers: { authorization: "Bearer " + getState().auth.token }})
          .then((res) => {
            dispatch({type:UPDATE_CANVAS_FULFILLED, payload:res.data})
 
            dispatch(fetchCanva(data._id))
          })
          .catch((err) => {
            dispatch({type:UPDATE_CANVAS_REJECTED, payload:err})
          })
    }
}


export const canvaReducer = function(state = initialState, action){
    switch(action.type){
        case FETCH_CANVAS_PENDING:
            return {...state, fetched:false, fetching:true, error:""}
        case FETCH_CANVAS_FULFILLED:
            return {...state, fetched:true, fetching:false, error:"", data:action.payload}
        case FETCH_CANVAS_REJECTED:
            return {...state, fetched:true, fetching:true, error:action.payload.message}

        case UPDATE_CANVAS_PENDING:
            return {...state, update:{ doing: true, done:false, error:""}}
        case UPDATE_CANVAS_FULFILLED:
            return {...state, update:{ doing: false, done:true, error:""}}
        case UPDATE_CANVAS_REJECTED:
            return {...state,  update:{ doing: true, done:true, error:action.payload.message}}
    
    }
    return state
}