export interface IField {
	id: number
	name: string
	label: string
	value: any
	type: string
	required?: boolean
	public?: boolean
	printable?: boolean
	handleChange: any
	options?: Array<string>
}
export interface INullField {
	id: ""
	name: ""
	label: ""
	value: ""
	type: ""
	required: false
	public: false
	printable: false
	handleChange: null
	options: []
}