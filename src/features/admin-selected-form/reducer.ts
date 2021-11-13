import { IForm } from "types/Form"
import { IAction } from "./types"
import { UPDATE_FORM, SELECT, UNSELECT } from "./constants"

import { getEmptyField } from "_data/constants"

export default (state: IForm, action: IAction) => {
	switch (action.type) {
		case SELECT:
			return action.payload.form
		case UPDATE_FORM:
			return { ...state, ...action.payload.values }
		case UNSELECT:
			return getEmptyField()
	}
}
