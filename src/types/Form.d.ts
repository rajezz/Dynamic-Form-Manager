import { IInputTextProps, IInputCheckboxProps, IInputRadioProps, IInputSelectProps } from "types/FormInput"

export interface IForm {
	name: string
	id: number
	fields: Array<IInputTextProps | IInputCheckboxProps | IInputRadioProps | IInputSelectProps>
	status: string
	validity: string
	accessibleUser: string
	createdAt: string
}

export interface IFormTableColumn {
	id: string
	label: string
	minWidth?: number
	align?: "right"
	format?: (value: number) => string
}