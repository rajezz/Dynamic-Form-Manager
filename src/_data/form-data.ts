import { IInputCheckboxProps, IInputRadioProps } from "types/FormInput"

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

