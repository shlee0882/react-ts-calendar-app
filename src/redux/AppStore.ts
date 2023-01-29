import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'

export type RootStatesType = {
}

const RootReducer = combineReducers({
})

const AppStore = configureStore({reducer: RootReducer})
export default AppStore
