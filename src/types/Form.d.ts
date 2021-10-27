import { IInputTextProps, IInputCheckboxProps, IInputRadioProps, IInputSelectProps } from "types/FormInput"

export interface IForm {
	name: string
	fields: Array<IInputTextProps | IInputCheckboxProps | IInputRadioProps | IInputSelectProps>
	status: "active" | "inactive"
	validity: string
	accessibleUser: string
	createdAt: string
	updatedAt: string
}

export interface IFormTableColumn {
	id: string
	label: string
	minWidth?: number
	align?: "right"
	format?: (value: number) => string
}