import {
	IInputCheckboxProps,
	IInputTextProps,
	IInputSelectProps,
	IInputRadioProps
} from "types/FormInput"

import { IFormTableColumn } from "types/Form"

/* export const formInputsCheckbox: Array<IInputCheckboxProps> = [
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

export const formInputText: Array<IInputTextProps> = [
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

export const formInputSelect: Array<IInputSelectProps> = [
	{
		value: "",
		name: "experience",
		label: "Experience",
		type: "DROPDOWN",
		required: true,
		public: true,
		printable: true,
		sortOrder: 6,
		options: ["1", "2", "3", "4", "5"]
	},
	{
		value: [],
		name: "preferred-location",
		label: "Preferred Location",
		type: "MULTI_DROPDOWN",
		required: true,
		public: true,
		printable: true,
		sortOrder: 6,
		options: ["Chennai", "Bengaluru", "Hyderabad", "Delhi", "Mumbai"]
	}
]
 */

export const fieldTableColumns: Array<IFormTableColumn> = [
	{ id: "label", label: "Label", minWidth: 170 },
	{ id: "type", label: "Type", minWidth: 170 },
	{ id: "options", label: "Options", minWidth: 170 },
	{ id: "required", label: "Required", minWidth: 100 },
	{ id: "public", label: "Public", minWidth: 100 },
	{ id: "printable", label: "Printable", minWidth: 100 },
	{ id: "action", label: "Action", minWidth: 100 }
]

export const formTableColumns: Array<IFormTableColumn> = [
	{ id: "name", label: "Name", minWidth: 170 },
	{ id: "createdAt", label: "Created At", minWidth: 100 },
	{ id: "fields", label: "Fields", minWidth: 100 },
	{ id: "accessibleUser", label: "Accessible User", minWidth: 100 },
	{ id: "status", label: "Status", minWidth: 170 },
	{ id: "validity", label: "Validity", minWidth: 170 }
]
export const submittedFormTableColumns: Array<IFormTableColumn> = [
	{ id: "submittedUser", label: "Submitted User", minWidth: 170 },
	{ id: "formName", label: "Form Name", minWidth: 100 },
	{ id: "formId", label: "Form Id", minWidth: 100 },
	{ id: "createdAt", label: "Created At", minWidth: 100 }
]

export const typeMap: any = {
	TEXT: {},
	PARAGRAPH: {
		multiline: true,
		rows: 3
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

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export const STRING_REGEX = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/

export const OPTION_FIELDS = ["DROPDOWN", "MULTI_DROPDOWN", "RADIO"]

export const CONTAINED: "text" | "outlined" | "contained" | undefined = "contained"
export const OUTLINED: "text" | "outlined" | "contained" | undefined = "outlined"

export const FORM_LIST: string = "form-list"
export const FORM_CREATE: string = "form-create"
export const FORM_SUBMITTED: string = "form-submitted"

export const nameLabelMap: any = {
	[FORM_LIST]: "Form List",
	[FORM_CREATE]: "Create New Form",
	[FORM_SUBMITTED]: "Submitted Form"
}
