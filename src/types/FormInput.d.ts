export interface IField {
	id: number
	name: string
	label: string
	value: any
	type: string
	required?: boolean
	public?: boolean
	printable?: boolean
	sortOrder?: number
	handleChange?: any
	options?: Array<string>
}