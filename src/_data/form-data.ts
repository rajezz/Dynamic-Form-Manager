import { IFormTableColumn } from "types/Form"
import InputText from "components/InputText"
import InputSelect from "components/InputSelect"
import InputDate from "components/InputDate"
import InputRadio from "components/InputRadio"
import InputCheckbox from "components/InputCheckbox"

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
	{ id: "validity", label: "Validity", minWidth: 170 },
	{ id: "fields", label: "Fields", minWidth: 100 },
	{ id: "accessibleUser", label: "Accessible User", minWidth: 100 },
	{ id: "status", label: "Status", minWidth: 170 },
	{ id: "createdAt", label: "Created At", minWidth: 100 },
	{ id: "updatedAt", label: "updated At", minWidth: 100 },
]
export const submittedFormTableColumns: Array<IFormTableColumn> = [
	{ id: "submittedUser", label: "Submitted User", minWidth: 170 },
	{ id: "formName", label: "Form Name", minWidth: 100 },
	{ id: "formId", label: "Form Id", minWidth: 100 },
	{ id: "createdAt", label: "Created At", minWidth: 100 },
	{ id: "updatedAt", label: "Updated At", minWidth: 100 },
	{ id: "action", label: "Action", minWidth: 100 }
]
export const userFormTableColumns: Array<IFormTableColumn> = [
	{ id: "formName", label: "Form Name", minWidth: 170 },
	{ id: "formId", label: "Form Id", minWidth: 100 },
	{ id: "createdAt", label: "Created At", minWidth: 100 },
	{ id: "updatedAt", label: "Updated At", minWidth: 100 },
]

export const TYPE_TEXT: string = "TEXT"
export const TYPE_PARAGRAPH: string = "PARAGRAPH"
export const TYPE_NUMBER: string = "NUMBER"
export const TYPE_EMAIL: string = "EMAIL"
export const TYPE_PHONE: string = "PHONE"
export const TYPE_PIN_CODE: string = "PIN_CODE"
export const TYPE_CHECKBOX: string = "CHECKBOX"
export const TYPE_RADIO: string = "RADIO"
export const TYPE_DROPDOWN: string = "DROPDOWN"
export const TYPE_MULTI_DROPDOWN: string = "MULTI_DROPDOWN"
export const TYPE_DATE: string = "DATE"
export const TYPE_PASSWORD: string = "PASSWORD"

//{ [index: string]: JSX.Element }
export const TYPE_ELEMENT_MAP: any = {
	[TYPE_TEXT]: InputText,
	[TYPE_PARAGRAPH]: InputText,
	[TYPE_NUMBER]: InputText,
	[TYPE_EMAIL]: InputText,
	[TYPE_PHONE]: InputText,
	[TYPE_PIN_CODE]: InputText,
	[TYPE_CHECKBOX]: InputCheckbox,
	[TYPE_RADIO]: InputRadio,
	[TYPE_DROPDOWN]: InputSelect,
	[TYPE_MULTI_DROPDOWN]: InputSelect,
	[TYPE_DATE]: InputDate
}
export const INPUT_TYPE_MAP: any = {
	[TYPE_TEXT]: "text",
	[TYPE_NUMBER]: "number",
	[TYPE_EMAIL]: "email",
	[TYPE_PHONE]: "tel",
	[TYPE_PIN_CODE]: "number",
	[TYPE_PASSWORD]: "password",
}
//{ [index: string]: JSX.Element }
export const TYPE_REGEX_MAP: any = {
	[TYPE_TEXT]: /^[A-Za-z0-9`'"/!*&%#$-_ ]+$/,
	[TYPE_PARAGRAPH]: /^[A-Za-z0-9`'"/!*&%#$-_ ]+$/,
	[TYPE_NUMBER]: /^[-]*[0-9]+$/,
	[TYPE_EMAIL]: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
	[TYPE_PHONE]: /^[+]*[0-9]{0,3}[0-9]{10}$/,
	[TYPE_PIN_CODE]: /^[0-9]{6}$/,
	[TYPE_RADIO]: /^[A-Za-z0-9`'"/!*&%#$-_ ]+$/,
}
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
	DATE: {},
	CHECKBOX: {},
	RADIO: {},
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

