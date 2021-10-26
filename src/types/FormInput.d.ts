export type IInputProps = {
	name: string
	value: string | string[]
	label: string
	type: string
	required?: boolean
	public?: boolean
	printable?: boolean
	sortOrder: number
	options?: string[]
	handleChange?: any
}

export type IInputCheckboxProps = {
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

export type IInputRadioProps = {
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
