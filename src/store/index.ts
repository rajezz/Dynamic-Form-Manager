import { createStore } from "redux"
import rootReducer from "store/root-reducer"
import { createWrapper } from "next-redux-wrapper"
const store = (initialState = {}):any => createStore(rootReducer, initialState)

export default createWrapper(store)
