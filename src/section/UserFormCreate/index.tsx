import React, { useState, useEffect, useContext, Fragment } from "react"
import { useRouter } from "next/router"

// Layouts...
import Layout from "layout/Layout"

import { IForm, ISubmittedForm } from "types/Form"
import { IField } from "types/FormInput"

// Library components...
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

//Components...
import InputText from "components/InputText"
import InputSelect from "components/InputSelect"
import InputDate from "components/InputDate"
import FieldListTable from "components/FieldListTable"
import SnackBar from "components/SnackBar"
import FormBuilder from "section/FormBuilder"
import { UserContext } from "section/UserContext"

// libraries...
import { getEmptyField, generateUUID, validateUserForm } from "lib/FormHandler"

// Data...
import { CONTAINED, OUTLINED } from "_data/constants"

function safeFetchArray(form: any, key: string, defaultValue: []) {
	return form ? form[key] : defaultValue
}
function safeFetchString(form: any, key: string, defaultValue: string) {
	return form ? form[key] : defaultValue
}

export default function UserFormCreate({
	email,
	form,
	onCancel
}: {
	email: string
	form: IForm
	onCancel: any
}) {
	const router = useRouter()

	const [loaded, setLoaded] = useState(false)
	const [message, setMessage] = useState<string>("")
	const [isSuccessMessage, toggleMessageType] = useState<boolean>(false)

	const [userForm, setUserForm] = useState<ISubmittedForm>({
		id: generateUUID(),
		fields: [],
		formName: "",
		formId: 0,
		submittedUser: "",
		createdAt: "",
		updatedAt: ""
	})

	useEffect(() => {
		let formValues: any = {}

		form?.id ? (formValues["formId"] = form.id) : null
		form?.name ? (formValues["formName"] = form.name) : null
		form?.fields ? (formValues["fields"] = form.fields) : null
		form?.createdAt ? (formValues["createdAt"] = form.createdAt) : null
		form?.updatedAt ? (formValues["updatedAt"] = form.updatedAt) : null

		formValues["submittedUser"] = email

		setUserForm((prevValue) => {
			let updatedContent:any = {}
			Object.assign(updatedContent, prevValue, formValues)
			return updatedContent
		})
		setLoaded(true)
	}, [])

	const handleChange = (name: string, value: any, i: number) => {
		setUserForm((prevValues: any) => ({
			...prevValues,
			fields: prevValues.fields?.map((field: IField, index: number) => {
				if (i === index) {
					return { ...field, [name]: value }
				} else {
					return field
				}
			})
		}))
		console.log("handleChange called !! ", userForm)
	}

	function storeInLocalstorage(form: ISubmittedForm) {
		const storedForms = localStorage.getItem("submittedForms")
		let contentToBeStored = ``
		if (storedForms) {
			let parsedContent = JSON.parse(storedForms)
			let isExist: boolean = false, index:number = -1
			parsedContent.forEach((storedForm: any, i:number) => {
				if (
					!isExist &&
					storedForm.formId === form.formId &&
					form.submittedUser === storedForm.submittedUser
				) {
					form.updatedAt = new Date().toISOString()
					isExist = true
					index = i
				}
			})
			if (isExist) {
				index > -1 ? parsedContent.splice(index, 1, form) : null
				contentToBeStored = JSON.stringify(parsedContent)
			} else {
				form.createdAt = new Date().toISOString()
				form.updatedAt = new Date().toISOString()
				contentToBeStored = JSON.stringify(parsedContent.concat(form))
			}
		} else {
			form.createdAt = new Date().toISOString()
			form.updatedAt = new Date().toISOString()
			contentToBeStored = JSON.stringify([form])
		}
		localStorage.setItem("submittedForms", contentToBeStored)
	}

	function saveUserForm() {
		const [valid, errors] = validateUserForm(userForm)
		if (!valid) {
			console.error(errors)
			toggleMessageType(false)
			setMessage(errors.join(", "))
			setTimeout(function (e) {
				setMessage("")
			}, 6000)
		} else {
			storeInLocalstorage(userForm)
			toggleMessageType(true)
			setMessage("Form submitted Successfully.")
			router.reload()
		}
	}

	function loadContent() {
		if (loaded) {
			return (
				<div className="form-section">
					<FormBuilder
						fields={userForm.fields}
						onChange={handleChange}
						onSave={saveUserForm}
						onCancel={onCancel}
						formName={userForm.formName}
					/>
				</div>
			)
		} else {
			return <div>Loading...</div>
		}
	}

	return (
		<Fragment>
			{loadContent()}
			<SnackBar message={message} success={isSuccessMessage} />
		</Fragment>
	)
}
