// Types...
import { IForm, INullForm, IAdminFormState } from "types/Form"

import {
	REDUCER_ACTION_INSERT,
	REDUCER_ACTION_UPDATE,
	REDUCER_ACTION_INSERT_FIELD,
	REDUCER_ACTION_UPDATE_FIELD,
	REDUCER_ACTION_DELETE_FIELD,
	REDUCER_ACTION_UPDATE_FORM,
	REDUCER_ACTION_DELETE,
	REDUCER_ACTION_SELECT,
	REDUCER_ACTION_UNSELECT,
	getEmptyAdminFormState,
	getEmptyField,
	getEmptyForm
} from "_data/constants"

export function reducer(state: IAdminFormState, action: any) {
	console.log("reducer called !! ", reducer)
	switch (action.type) {
		case REDUCER_ACTION_INSERT:
			return {
				...state,
				forms: state.forms.concat(action.forms)
			}
		case REDUCER_ACTION_UPDATE:
			let updated = false
			const updatedForms = state.forms.map((form) => {
				if (action.form.id === form.id) {
					updated = true
					return action.form
				}
				return form
			})
			return {
				...state,
				forms: updated ? updatedForms : updatedForms.concat(action.form)
			}
		case REDUCER_ACTION_DELETE:
			return {
				...state,
				forms: state.forms.filter((form) => form.id !== action.id)
			}
		case REDUCER_ACTION_SELECT:
			return {
				...state,
				selectedForm: action.form
			}
		case REDUCER_ACTION_UNSELECT:
			return {
				...state,
				selectedForm: getEmptyForm()
			}
		case REDUCER_ACTION_UPDATE_FORM:
			return {
				...state,
				selectedForm: { ...state.selectedForm, ...action.values }
			}
		case REDUCER_ACTION_INSERT_FIELD:
			return {
				...state,
				selectedForm: {
					...state.selectedForm,
					fields: state.selectedForm.fields.concat([getEmptyField()])
				}
			}
		case REDUCER_ACTION_UPDATE_FIELD:
			return {
				...state,
				selectedForm: {
					...state.selectedForm,
					fields: state.selectedForm.fields.map((field) => {
						if (field.id === action.id) {
							return {
								...field,
								...action.values
							}
						} else {
							return field
						}
					})
				}
			}
		case REDUCER_ACTION_DELETE_FIELD:
			return {
				...state,
				selectedForm: {
					...state.selectedForm,
					fields: state.selectedForm.fields.filter((field) => field.id !== action.id)
				}
			}
		default:
			return state
	}
}