import { IInputCheckboxProps, IInputProps, IInputRadioProps } from "types/FormInput"

export const formInputsCheckbox: Array<IInputCheckboxProps> = [
	{
		value: false,
		name: "qualified",
		label: "Qualified",
		type: "CHECKBOX",
		required: false,
		public: false,
		printable: true,
		sortOrder: 4
	}
]

export const formInputsRadio: Array<IInputRadioProps> = [
	{
		value: "",
		label: "Gender",
		name: "gender",
		type: "RADIO",
		required: true,
		public: true,
		printable: true,
		sortOrder: 3,
		options: ["Male", "Female", "Other"]
	}
]

export const formInputText: Array<IInputProps> = [
	{
		value: "",
		name: "name",
		label: "Name",
		type: "TEXT",
		required: true,
		public: true,
		printable: true,
		sortOrder: 1
	},
	{
		value: "",
		name: "email",
		label: "Email",
		type: "EMAIL",
		required: true,
		public: true,
		printable: true,
		sortOrder: 2
	},
	{
		value: "",
		name: "phone",
		label: "Phone",
		type: "PHONE",
		required: true,
		public: true,
		printable: true,
		sortOrder: 3
	},
	{
		value: "",
		name: "description",
		label: "Description",
		type: "PARAGRAPH",
		required: false,
		public: true,
		printable: true,
		sortOrder: 4
	}
]

export const typeMap: any = {
	TEXT: {},
	PARAGRAPH: {
		multiline: true,
		rows: 4
	},
	NUMBER: {
		type: "number"
	},
	EMAIL: {
		type: "email"
	},
	PHONE: {
		type: "phone"
	},
	PIN_CODE: {
		type: "pincode"
	},
	DROPDOWN: {},
	MULTI_DROPDOWN: {},
	DATE: {}
}
