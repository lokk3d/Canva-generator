import { createStore, applyMiddleware, combineReducers } from "redux"
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'


import { authReducer } from "../authPage/authReducer"
import { appInfoReducer } from "./appInfoReducer"
import { canvasListReducer } from "../homePage/canvaListReducer"
import { canvaReducer } from "../canvas/canvaReducer"
import { userReducer } from "../user/userReducer"

const reducers = combineReducers({
    auth: authReducer,
    appInfo: appInfoReducer,
    canvas: canvasListReducer, //tutte le mie canvas
    canva: canvaReducer,//singola canva alla quale sto lavorando ora
    user: userReducer
})

const middleware = applyMiddleware( thunk, createLogger())

export const store = createStore(reducers, middleware)