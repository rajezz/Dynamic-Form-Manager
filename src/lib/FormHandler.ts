// Types...
import { IForm, ISubmittedForm } from "types/Form"
import { jsPDF } from "jspdf"
import axios from "axios"

// Data...
import {
	EMAIL_REGEX,
	STRING_REGEX,
	OPTION_FIELDS,
	TYPE_TEXT,
	TYPE_PARAGRAPH,
	TYPE_NUMBER,
	TYPE_EMAIL,
	TYPE_PHONE,
	TYPE_PIN_CODE,
	TYPE_CHECKBOX,
	TYPE_RADIO,
	TYPE_DROPDOWN,
	TYPE_MULTI_DROPDOWN,
	TYPE_DATE,
	TYPE_REGEX_MAP
} from "_data/constants"

function validateEmail(email: string): boolean {
	return EMAIL_REGEX.test(email.trim())
}
function validateEmails(emails: string): boolean {
	const splits = emails.split(",")
	return splits.some((split) => !validateEmail(split))
}

function validateFieldWithRegex(value: string, type: string): boolean {
	return TYPE_REGEX_MAP[type].test(value)
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
function validateFieldValue(field: any): [valid: boolean, errors: string[]] {
	let errors: string[] = []

	switch (field.type) {
		case TYPE_NUMBER:
		case TYPE_EMAIL:
		case TYPE_PHONE:
		case TYPE_PIN_CODE:
			if (field.required) {
				field.value === "" && errors.push(`Field - (${field.label}) is required`)
			}
			field.value !== "" &&
				!validateFieldWithRegex(field.value, field.type) &&
				errors.push(`Field - (${field.label}) value is invalid`)
			break
		case TYPE_TEXT:
		case TYPE_PARAGRAPH:
		case TYPE_RADIO:
		case TYPE_DROPDOWN:
			field.required &&
				field.value === "" &&
				errors.push(`Field - (${field.label}) is required`)
			break
		case TYPE_MULTI_DROPDOWN:
			field.required &&
				(field.value === "" || field.value.length === 0) &&
				errors.push(`Field - (${field.label}) is required`)
			break
		case TYPE_DATE:
			field.required &&
				!Date.parse(field.value) &&
				errors.push(`Field - (${field.label}) is required`)
			break
		case TYPE_CHECKBOX:
			field.required && !field.value && errors.push(`Field - (${field.label}) is required`)
			break
	}
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

export function formatForm(forms: any[]) {
	return forms.map((form) => ({
		submittedUser: form.submittedUser,
		formName: form.formName,
		formId: form.formId,
		createdAt: form.createdAt ? new Date(form.createdAt).toLocaleString() : "N/A",
		updatedAt: form.updatedAt ? new Date(form.updatedAt)?.toLocaleString() : "N/A",
		id: form.id
	}))
}

export const getFormById = (forms: any[], id: number) => forms.filter((form) => form.id === id)[0]

export function validateForm(form: IForm): [boolean, string[], IForm] {
	console.log("Form to be saved > ", form)
	let errors: string[] = []

	form.name === "" && errors.push("Form name should not be empty")

	!["Active", "Inactive"].includes(form.status) && errors.push("Form status should not be empty")

	validateEmails(form.accessibleUser) &&
		errors.push("Accessible user should contain valid Email address seperated by Comma")

	if (form.fields && form.fields.length > 0) {
		form.fields.forEach((field) => {
			field.name = convertToKebabCase(field.label)
			const [valid, tempErrors] = validateField(field)
			!valid && errors.push(...tempErrors)
		})
	} else {
		errors.push("Atleast one field need to be created for a Form.")
	}

	form.createdAt = new Date().toISOString()
	return [errors.length === 0, errors, form]
}

export function validateUserForm(form: ISubmittedForm): [boolean, string[]] {
	console.log("Form to be saved > ", form)
	let errors: string[] = []

	form.fields?.forEach((field) => {
		const [valid, tempErrors] = validateFieldValue(field)
		!valid && errors.push(...tempErrors)
	})

	return [errors.length === 0, errors]
}

function convertToKebabCase(str: string) {
	// @ts-ignore
	return str
		.match(STRING_REGEX)
		.map((x) => x.toLowerCase())
		.join("-")
}

export async function downloadPDF({
	formName,
	createdAt,
	updatedAt,
	fields,
	submittedUser
}: {
	formName: string
	createdAt: string
	updatedAt?: string
	fields?: any[]
	submittedUser: string
}) {
	try {
		// Default export is a4 paper, portrait, using millimeters for units
		const doc = new jsPDF()
		doc.html(
			generateHTMLContentForDownload({
				formName,
				createdAt,
				updatedAt,
				fields,
				submittedUser
			}),
			{
				callback: function (pdfDoc) {
					const dataURL = pdfDoc.output("datauristring", { filename: "export-form.pdf" })
					const link = document.createElement("a")
					link.download = "export-form.pdf"
					link.href = dataURL
					document.body.appendChild(link)
					link.click()
					document.body.removeChild(link)
				},
				x: 1,
				y: 1,
				width: 800,
				windowWidth: 2600,
				autoPaging: true,
				margin: [0, 100, 0, 0]
			}
		)
	} catch (error) {
		console.error("Couldn't send email > ", error)
		throw new Error("Couldn't send the mail.")
	}
}

export async function sendMail({
	to,
	formName,
	createdAt,
	updatedAt,
	fields,
	submittedUser,
}: {
	to: string
	formName: string
	createdAt: string
	updatedAt?: string
	fields?: any[]
	submittedUser: string
}) {
	try {
		const msg = {
			to,
			from: "rajezzandrj@gmail.com",
			subject: `Dynamic form - ${formName}`,
			html: generateHTMLContentForEmail({
				fields,
				formName,
				createdAt,
				updatedAt,
				submittedUser
			})
		}
		const option = {
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(msg)
		}
		const response = await axios.post(`https://${window.location.hostname}/api/send-mail`, option)
		console.log("Email sent > ", response)
		return response
	} catch (error) {
		console.error("Couldn't send email > ", error)
		throw new Error("Couldn't send the mail.")
	}
}

const optionFormatter = (options: Array<string> | string | undefined): Array<any> => {
	if (Array.isArray(options)) {
		return options.map((option) => option)
	} else if (typeof options === "string") {
		const splits = options.split(",")
		return splits.map((option: string) => option.trim())
	} else {
		return []
	}
}
/* 
function generateHTMLContentForDownload({
	formName,
	createdAt,
	updatedAt,
	fields,
	submittedUser
}: {
	formName: string
	createdAt: string
	updatedAt: string | undefined
	fields: any[] | undefined
	submittedUser: string
}) {
	const fieldElements = fields?.map((field: any) => getFieldElement(field))
	return `
			<p><h4>${formName}</h4></p>
			<p><h6>Submitted version of the form. Field values are read-only.</h6></p>
				
				<div style="margin-bottom: 6px; color: #767676">Submitted by:- <strong>${submittedUser}</strong></div>
				<div style="margin-bottom: 6px; color: #767676">Submitted at:- <strong>${
					createdAt ? new Date(createdAt).toString() : "N/A"
				}</strong></div>
				<div style="margin-bottom: 6px; color: #767676">Last updated at:- <strong>${
					updatedAt ? new Date(updatedAt).toString() : "N/A"
				}</strong></div>
			${fieldElements?.join("")}
		`
} */

function generateHTMLContentForDownload({
	formName,
	createdAt,
	updatedAt,
	fields,
	submittedUser
}: {
	formName: string
	createdAt: string
	updatedAt: string | undefined
	fields: any[] | undefined
	submittedUser: string
}) {
	const fieldElements = fields?.map((field: any) => getFieldElement(field))
	return `	
	<body style="font-size:11px;margin: 0px; width:500px !important; background-color: #ede7f6">
		<div class="body" style="margin: 0px 2rem; width:100%; padding: 1rem 0px">
			<div
				style="
					background-color: #fff;
					border: 1px solid #dadce0;
					border-radius: 8px;
					margin: 1rem 0px;
					padding: 2rem;
					display: block;
					border-top: 5px solid #6200ff; width:100%;
				"
			>
				<div
					class="title"
					style="
						font-size: 20px;
						font-weight: 600;
						line-height: 30px;
						color: #202124;
						line-height: 135%;
						max-width: 100%;
						min-width: 0%;
					"
				>
					${formName}
				</div>
				<div
					class="descrip"
					style="
						font-size: 11px;
						font-weight: 500;
						letter-spacing: 0.2px;
						line-height: 20px;
						color: #202124;
						margin-top: 12px;
					"
				>
					Submitted version of the form. Field values are read-only.
				</div>
				<hr style="
					height: 1px;
        			background-color: #ccc;
        			border: none;">
				<div style="margin-bottom: 6px; color: #767676">Submitted by:- <strong>${submittedUser}</strong></div>
				<div style="margin-bottom: 6px; color: #767676">Submitted at:- <strong>${
					createdAt ? new Date(createdAt).toString() : "N/A"
				}</strong></div>
				<div style="margin-bottom: 6px; color: #767676">Last updated at:- <strong>${
					updatedAt ? new Date(updatedAt).toString() : "N/A"
				}</strong></div>
			</div>
			${fieldElements?.join("")}
		</div>
	</body>`
}

function generateHTMLContentForEmail({
	formName,
	createdAt,
	updatedAt,
	fields,
	submittedUser
}: {
	formName: string
	createdAt: string
	updatedAt: string | undefined
	fields: any[] | undefined
	submittedUser: string
}) {
	const fieldElements = fields?.map((field: any) => getFieldElement(field))
	return `
	<body style="margin: 0px; background-color: #ede7f6">
		<div class="body" style="margin: 0px 10%; padding: 1rem 0px">
			<div
				style="
					background-color: #fff;
					border: 1px solid #dadce0;
					border-radius: 8px;
					margin: 1rem 0px;
					padding: 2rem;
					display: block;
					border-top: 5px solid #6200ff;
				"
			>
				<div
					class="title"
					style="
						font-size: 32px;
						font-weight: 600;
						line-height: 40px;
						color: #202124;
						line-height: 135%;
						max-width: 100%;
						min-width: 0%;
					"
				>
					${formName}
				</div>
				<div
					class="descrip"
					style="
						font-size: 14px;
						font-weight: 500;
						letter-spacing: 0.2px;
						line-height: 20px;
						color: #202124;
						margin-top: 12px;
					"
				>
					Submitted version of the form. Field values are read-only.
				</div>
				<hr style="
					height: 1px;
        			background-color: #ccc;
        			border: none;">
				<div style="margin-bottom: 6px; color: #767676">Submitted by:- <strong>${submittedUser}</strong></div>
				<div style="margin-bottom: 6px; color: #767676">Submitted at:- <strong>${
					createdAt ? new Date(createdAt).toString() : "N/A"
				}</strong></div>
				<div style="margin-bottom: 6px; color: #767676">Last updated at:- <strong>${
					updatedAt ? new Date(updatedAt).toString() : "N/A"
				}</strong></div>
			</div>
			${fieldElements?.join("")}
		</div>
	</body>`
}

function getFieldElement(field: any) {
	if (field.printable) {
		switch (field.type) {
			case TYPE_TEXT:
			case TYPE_PARAGRAPH:
			case TYPE_NUMBER:
			case TYPE_EMAIL:
			case TYPE_PHONE:
			case TYPE_DATE:
			case TYPE_PIN_CODE:
			case TYPE_DROPDOWN:
			case TYPE_MULTI_DROPDOWN:
				return `<div
					style="
						background-color: #fff;
						border: 1px solid #dadce0;
						border-radius: 8px;
						margin: 1rem 0px;
						padding: 2rem;
						display: block;
					"
				>
					<label
						style="
							color: rgba(0, 0, 0, 0.6);
							font-weight: 400;
							font-size: 1rem;
							line-height: 1.4375em;
							letter-spacing: 0.00938em;
							padding: 0;
							margin-bottom: 0.5rem;
						"
						>${field.label}</label
					>
					<div
						style="
							display: block;
							width: calc(100% - 2rem);
							padding: 8px 12px;
							border-radius: 4px;
							background-color: transparent;
							border-color: #bfbfbf;
							border-width: 1px;
							border-style: solid;
							font-weight: 600;
							color: #4c4848;
							transition: all 0.2s ease-in-out;
							cursor: text;
						"
					>
						${field.value}
					</div>
				</div>`
			case TYPE_RADIO:
				const optionElements = optionFormatter(field.options).map(
					(option) => `<div
						style="
							display: block;
							width: calc(100% - 2rem);
							background-color: transparent;
							font-weight: 600;
							color: #4c4848;
						"
					>
						<input name="${field.name}" value="${option}" type="radio" disabled="" ${
						field.value == option ? "checked" : ""
					} />
						<div style="display: inline-block;margin-bottom: 5px;">${option}</div>
					</div>`
				)
				return `<div
					style="
						background-color: #fff;
						border: 1px solid #dadce0;
						border-radius: 8px;
						margin: 1rem 0px;
						padding: 2rem;
						display: block;
					"
				>
					<label
						style="
							color: rgba(0, 0, 0, 0.6);
							font-weight: 400;
							font-size: 14px;
							line-height: 18px;
							letter-spacing: 0.00938em;
							padding: 0;
							margin-bottom: 8px;
						"
						>Gender</label>
					${optionElements.join("")}
				</div>`
			case TYPE_CHECKBOX:
				return `<div
					style="
						background-color: #fff;
						border: 1px solid #dadce0;
						border-radius: 8px;
						margin: 1rem 0px;
						padding: 2rem;
						display: block;
					"
				>
					<input type="checkbox" disabled="" ${field.value ? "checked" : ""} style="margin-right: 6px;"/>
					<label
						style="
							color: rgba(0, 0, 0, 0.6);
							font-weight: 400;
							font-size: 1rem;
							line-height: 1.4375em;
							letter-spacing: 0.00938em;
							padding: 0;
							display: inline-block;
						"
						>${field.label}</label
					>
				</div>`
		}
	}
	return ``
}

function getSimpFieldElement(field: any) {
	if (field.printable) {
		switch (field.type) {
			case TYPE_TEXT:
			case TYPE_PARAGRAPH:
			case TYPE_NUMBER:
			case TYPE_EMAIL:
			case TYPE_PHONE:
			case TYPE_DATE:
			case TYPE_PIN_CODE:
			case TYPE_DROPDOWN:
			case TYPE_MULTI_DROPDOWN:
				return `<div
					style="
						background-color: #fff;
						border: 1px solid #dadce0;
						border-radius: 8px;
						margin: 1rem 0px;
						padding: 2rem;
						display: block;
						width:100%;
					"
				>
					<label
						style="
							color: rgba(0, 0, 0, 0.6);
							font-weight: 400;
							font-size: 1rem;
							line-height: 1.4375em;
							letter-spacing: 0.00938em;
							padding: 0;
						
							margin-bottom: 0.5rem;
						"
						>${field.label}</label
					>
					<div
						style="
							display: block;
							width: calc(100% - 2rem);
							padding: 8px 12px;
							border-radius: 4px;
							background-color: transparent;
							border-color: #bfbfbf;
							border-width: 1px;
							border-style: solid;
							font-weight: 600;
							color: #4c4848;
							transition: all 0.2s ease-in-out;
							cursor: text;
						"
					>
						${field.value}
					</div>
				</div>`
			case TYPE_RADIO:
				const optionElements = optionFormatter(field.options).map(
					(option) => `<div
						style="
							display: block;
							width: calc(100% - 2rem);
							background-color: transparent;
							font-weight: 600;
						width:100%;
							color: #4c4848;
						"
					>
						<input name="${field.name}" value="${option}" type="radio" disabled="" ${
						field.value == option ? "checked" : ""
					} />
						<div style="display: inline-block;margin-bottom: 5px;">${option}</div>
					</div>`
				)
				return `<div
					style="
						background-color: #fff;
						border: 1px solid #dadce0;
						border-radius: 8px;
						margin: 1rem 0px;
						padding: 2rem;
						width:100%;
						display: block;
					"
				>
					<label
						style="
							color: rgba(0, 0, 0, 0.6);
							font-weight: 400;
							font-size: 14px;
							line-height: 18px;
							letter-spacing: 0.00938em;
							padding: 0;
							margin-bottom: 8px;
						"
						>Gender</label>
					${optionElements.join("")}
				</div>`
			case TYPE_CHECKBOX:
				return `<div
					style="
						background-color: #fff;
						border: 1px solid #dadce0;
						border-radius: 8px;
						margin: 1rem 0px;
						width:100%;
						padding: 2rem;
						display: block;
					"
				>
					<input type="checkbox" disabled="" ${field.value ? "checked" : ""} style="margin-right: 6px;"/>
					<label
						style="
							color: rgba(0, 0, 0, 0.6);
							font-weight: 400;
							font-size: 1rem;
							line-height: 1.4375em;
							letter-spacing: 0.00938em;
							padding: 0;
							display: inline-block;
						"
						>${field.label}</label
					>
				</div>`
		}
	}
	return ``
}
