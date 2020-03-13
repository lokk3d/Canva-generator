import axios from "axios"

const initialState = {
    fetched:false,
    error:"",
    fetching:false,
    data:[],

    newCanva:{
        doing:false,
        done:false,
        error: ""
    },

    deleteCanva:{
        doing:false,
        done:false,
        error: ""
    },

}


const CREATE_CANVA_PENDING = "CREATE_CANVA_PENDING"
const CREATE_CANVA_FULFILLED = "CREATE_CANVA_FULFILLED"
const CREATE_CANVA_REJECTED = "CREATE_CANVA_REJECTED"
export const createNewCanvas = (title) => {
    return (dispatch, getState) => {

        dispatch({type:CREATE_CANVA_PENDING})
        const authToken = "Bearer " + getState().auth.token
        console.log(authToken)
        axios.post('/api/canvas/add',
        {title},
        { headers: { authorization: authToken } })
          .then((res) => {
            dispatch({type:CREATE_CANVA_FULFILLED})
            dispatch(fetchCanvases())
          })
          .catch((err) => {
            dispatch({type:CREATE_CANVA_REJECTED, payload:err})

          })
    }
}

const FETCH_CANVASES_PENDING = "FETCH_CANVASES_PENDING"
const FETCH_CANVASES_FULFILLED = "FETCH_CANVASES_FULFILLED"
const FETCH_CANVASES_REJECTED = "FETCH_CANVASES_REJECTED"
export const fetchCanvases = () => {
    return (dispatch, getState) => {

        dispatch({type:FETCH_CANVASES_PENDING})

        axios.get('/api/canvas/',
        { headers: { authorization: "Bearer " + getState().auth.token } })
          .then((res) => {
            dispatch({type:FETCH_CANVASES_FULFILLED, payload:res.data})
          })
          .catch((err) => {
            dispatch({type:FETCH_CANVASES_REJECTED, payload:err})

          })
    }
}

const DELETE_CANVAS_PENDING = "DELETE_CANVAS_PENDING"
const DELETE_CANVAS_FULFILLED = "DELETE_CANVAS_FULFILLED"
const DELETE_CANVAS_REJECTED = "DELETE_CANVAS_REJECTED"
export const deleteCanvas = (id) => {
    return (dispatch, getState) => {

        dispatch({type:DELETE_CANVAS_PENDING})

        axios.delete('/api/canvas/delete',
        {
            data: { _id: id },
            headers: { authorization: "Bearer " + getState().auth.token }
        })
          .then((res) => {
            dispatch({type:DELETE_CANVAS_FULFILLED})
            dispatch(fetchCanvases())

          })
          .catch((err) => {
            dispatch({type:DELETE_CANVAS_REJECTED, payload:err})
          })
    }
}

export const canvasListReducer = function(state = initialState, action) {
    switch(action.type){

        case CREATE_CANVA_PENDING:
            return {...state, newCanva:{...state.newCanva, doing:true, done:false, error:""}}
        case CREATE_CANVA_FULFILLED:
            return {...state, newCanva:{...state.newCanva, doing:false, done:true, error:""}}
        case CREATE_CANVA_REJECTED:
            return {...state, newCanva:{...state.newCanva, doing:false, done:true, error:action.payload.message}}

        case FETCH_CANVASES_PENDING:
            return {...state, fetched:false, fetching:true, error:""}
        case FETCH_CANVASES_FULFILLED:
            return {...state, fetched:true, fetching:false, error:"", data:action.payload}
        case FETCH_CANVASES_REJECTED:
            return {...state, fetched:false, fetching:true, error:action.payload.message}

        case DELETE_CANVAS_PENDING:
            return {...state, deleteCanva:{...state.deleteCanva, doing:true, done:false, error:""}}
        case DELETE_CANVAS_FULFILLED:
            return {...state, deleteCanva:{...state.deleteCanva, doing:false, done:true, error:""}}
        case DELETE_CANVAS_REJECTED:
            return {...state, deleteCanva:{...state.deleteCanva, doing:false, done:true, error:action.payload.message}}
        
    }
    return state
}