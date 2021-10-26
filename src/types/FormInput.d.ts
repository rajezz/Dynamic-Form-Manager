export interface IInputTextProps {
	name: string
	value: string
	label: string
	type: string
	required?: boolean
	public?: boolean
	printable?: boolean
	sortOrder: number
	handleChange?: any
}

export interface IInputSelectProps {
	name: string
	value: string | string[]
	label: string
	type: string
	required?: boolean
	public?: boolean
	printable?: boolean
	sortOrder: number
	options: Array<string>
	handleChange?: any
}

interface IOption {
	value: string
	label: string
}

export interface IInputCheckboxProps {
	name: string
	value: boolean
	label: string
	type: "CHECKBOX"
	required?: boolean
	public?: boolean
	printable?: boolean
	sortOrder: number
	handleChange?: any
}

export interface IInputRadioProps {
	name: string
	value: string
	label: string
	type: "RADIO"
	required?: boolean
	public?: boolean
	printable?: boolean
	sortOrder: number
	options: string[]
	handleChange?: any
}
