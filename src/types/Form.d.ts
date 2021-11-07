import { IField } from "types/FormInput"
import { INullField } from './FormInput';

export interface IForm {
	name: string
	id: number
	fields: Array<IField | INullField>
	status: string
	validity: string
	accessibleUser: string
	createdAt: string
	updatedAt: string
}

export interface INullForm {
	name: ""
	id: 0
	fields: Array<IField | INullField>
	status: ""
	validity: ""
	accessibleUser: ""
	createdAt: ""
	updatedAt: ""
}

export interface IAdminFormState {
	forms: Array<IForm | INullForm>
	selectedForm: IForm | INullForm
}

export interface ISubmittedForm {
	id: number
	formName: string
	formId: number
	submittedUser: string
	fields: Array<IField | INullField>
	createdAt: string
	updatedAt: string
}

export interface INullSubmittedForm {
	id: 0
	formName: ""
	formId: 0
	submittedUser: ""
	fields: []
	createdAt: ""
	updatedAt: ""
}

export interface IFormTableColumn {
	id: string
	label: string
	minWidth?: number
	align?: "right"
	format?: (value: number) => string
}
