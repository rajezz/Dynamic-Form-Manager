import { IForm } from "types/Form"
import { IAction } from "./types"
import { INSERT, UPDATE, DELETE } from "./constants"

export default (state: Array<IForm>, action: IAction) => {
	switch (action.type) {
		case INSERT:
			return [...state, action.payload.form]
		case UPDATE:
			let updated = false
			const updatedForms = state.map((form) => {
				if (action.payload.form.id === form.id) {
					updated = true
					return action.payload.form
				}
				return form
			})
			return updated ? [...updatedForms] : [...updatedForms, action.payload.form]
		case DELETE:
			return state.filter((form) => form.id !== action.payload.id)
	}
}
