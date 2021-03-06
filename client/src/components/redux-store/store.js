import { createStore, applyMiddleware, combineReducers } from "redux"
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'


import { authReducer } from "../authPage/authReducer"
import { appInfoReducer } from "./appInfoReducer"
import { canvasListReducer } from "../homePage/canvaListReducer"
import { canvasReducer } from "../features/canvas/canvasReducer"
import { userReducer } from "../features/user/userReducer"
import { templateReducer } from "../features/canvasTemplate/templateReducer"

const reducers = combineReducers({
    auth: authReducer,
    appInfo: appInfoReducer,
    canvases: canvasListReducer, //tutte le mie canvas
    canvas: canvasReducer,//singola canva alla quale sto lavorando ora
    user: userReducer,
    templates: templateReducer
})

const middleware = applyMiddleware( thunk, createLogger())

export const store = createStore(reducers, middleware)