import { INSERT, UPDATE, UPDATE_FORM, DELETE } from "./constants"

import { IAction } from "./types"

export const insertForm = (payload: any): IAction => ({
	type: INSERT,
	payload
})
export const updateForm = (payload: any): IAction => ({
	type: UPDATE,
	payload
})
export const updateFormValue = (payload: any): IAction => ({
	type: UPDATE_FORM,
	payload
})
export const deleteForm = (payload: any): IAction => ({
	type: DELETE,
	payload
})
