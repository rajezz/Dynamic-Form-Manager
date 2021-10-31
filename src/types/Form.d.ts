import { IInput } from "types/FormInput"

export interface IForm {
	name: string
	id: number
	fields?: Array<IInput>
	status: string
	validity: string
	accessibleUser: string
	createdAt: string
	updatedAt?: string
}
export interface ISubmittedForm {
	id: number
	formName: string
	formId: number
	submittedUser: string
	fields?: Array<IInput>
	createdAt: string
	updatedAt?: string
}

export interface IFormTableColumn {
	id: string
	label: string
	minWidth?: number
	align?: "right"
	format?: (value: number) => string
}
