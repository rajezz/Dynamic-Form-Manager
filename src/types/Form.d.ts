import { IInput } from "types/FormInput"

export interface IForm {
	name: string
	id: number
	fields: Array<IInput>
	status: string
	validity: string
	accessibleUser: string
	createdAt: string
}
export interface ISubmittedForm {
	id: number
	formName: formName
	formId: formId
	submittedUser: string
	fields: Array<IInput>
	createdAt: string
}

export interface IFormTableColumn {
	id: string
	label: string
	minWidth?: number
	align?: "right"
	format?: (value: number) => string
}
