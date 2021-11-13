import { UPDATE_FORM, SELECT, UNSELECT } from "./constants"

import { IAction } from "./types"

export const updateForm = (payload: any): IAction => ({
	type: UPDATE_FORM,
	payload
})
export const selectForm = (payload: any): IAction => ({
	type: SELECT,
	payload
})
export const unselectForm = (payload: any): IAction => ({
	type: UNSELECT,
	payload
})
