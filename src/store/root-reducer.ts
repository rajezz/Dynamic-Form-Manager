import { combineReducers } from "redux"
import { adminFormListReducer } from "features/admin-form-list"
import { adminSelectedFormReducer } from "features/admin-selected-form"

export default combineReducers({
	adminFormList: adminFormListReducer,
	adminSelectedForm: adminSelectedFormReducer
})
