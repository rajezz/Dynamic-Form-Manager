// Types...
import { IForm, INullForm, IAdminFormState } from "types/Form"
import { IField, INullField } from "types/FormInput"

// libraries...
import { getEmptyField, generateUUID, validateForm } from "lib/FormHandler"

import {
	REDUCER_ACTION_INSERT,
	REDUCER_ACTION_UPDATE,
	REDUCER_ACTION_INSERT_FIELD,
	REDUCER_ACTION_UPDATE_FIELD,
	REDUCER_ACTION_DELETE_FIELD,
	REDUCER_ACTION_UPDATE_FORM,
	REDUCER_ACTION_DELETE,
	REDUCER_ACTION_SELECT,
	REDUCER_ACTION_UNSELECT
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
				selectedForm: emptyForm
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
					fields: state.selectedForm.fields.concat([emptyField])
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

export const emptyField: IField | INullField = {
	id: generateUUID(),
	name: "",
	value: "",
	label: "",
	type: "",
	handleChange: null,
	required: false,
	public: false,
	printable: false
}

export const emptyForm: INullForm | IForm = {
	name: "",
	id: generateUUID(),
	fields: [],
	status: "",
	validity: new Date().toString(),
	accessibleUser: "",
	createdAt: "",
	updatedAt: ""
}

export function getEmptyAdminFormState({
	forms,
	selectedForm
}: {
	forms: Array<INullForm | IForm>
	selectedForm: INullForm | IForm
}): IAdminFormState {
	return { forms, selectedForm: selectedForm ?? emptyForm }
}
