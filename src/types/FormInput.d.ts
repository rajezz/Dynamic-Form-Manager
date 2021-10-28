interface IInput {
	id: number
	name: string
	label: string
	type: string
	required?: boolean
	public?: boolean
	printable?: boolean
	sortOrder?: number
	handleChange?: any
}

export interface IInputTextProps extends IInput {
	value: string
}

export interface IInputSelectProps extends IInput {
	value: string | string[]
	options: Array<string>
}

interface IOption {
	value: string
	label: string
}

export interface IInputCheckboxProps extends IInput {
	value: boolean
	type: "CHECKBOX"
}

export interface IInputRadioProps extends IInput {
	value: string
	type: "RADIO"
	options: string[]
}
