// Types...
import { IForm } from "types/Form"

// Data...
import { EMAIL_REGEX, STRING_REGEX, OPTION_FIELDS } from "_data/form-data"

function validateEmail(email: string): boolean {
	return EMAIL_REGEX.test(email.trim())
}
function validateEmails(emails: string): boolean {
	const splits = emails.split(",")
	return splits.some((split) => !validateEmail(split))
}

function validateField(field: any): [valid: boolean, errors: string[]] {
	let errors: string[] = []

	field.name === "" && errors.push("Field name should not be empty")

	field.type === "" && errors.push("Field type should not be empty")

	OPTION_FIELDS.includes(field.type) &&
		field.options === "" &&
		errors.push("Option need to be provided for field type: DROPDOWN, MULTI_DROPDOWN, RADIO")

	return [errors.length === 0, errors]
}

export function getEmptyField() {
	return {
		id: generateUUID(),
		name: "",
		value: "",
		label: "",
		type: "",
		required: false,
		public: false,
		printable: false
	}
}

export function generateUUID(): number {
	return Math.floor(Math.random() * (9999 - 1000)) + 1000
}

export function validateForm(form: IForm): [boolean, string[], IForm] {
	console.log("Form to be saved > ", form)
	let errors: string[] = []

	form.name === "" && errors.push("Form name should not be empty")

	!["Active", "Inactive"].includes(form.status) && errors.push("Form status should not be empty")

	validateEmails(form.accessibleUser) &&
		errors.push("Accessible user should contain valid Email address seperated by Comma")

	if (form.fields.length > 0) {
		form.fields.forEach((field) => {
			const [valid, errors] = validateField(field)
			!valid && errors.push(...errors)
            field.name = convertToKebabCase(field.label)
		})
	} else {
		errors.push("Atleast one field need to be created for a Form.")
    }
    

	form.createdAt = new Date().toISOString()
	return [errors.length === 0, errors, form]
}

function convertToKebabCase(str: string) {
	// @ts-ignore
	return str.match(STRING_REGEX)
		.map((x) => x.toLowerCase())
		.join("-")
}
