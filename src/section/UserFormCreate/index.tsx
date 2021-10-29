import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

// Layouts...
import Layout from "layout/Layout"

import { IForm } from "types/Form"

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

// libraries...
import { getEmptyField, generateUUID, validateForm } from "lib/form-handler"

// Data...
import { CONTAINED, OUTLINED } from "_data/form-data"

export default function UserFormCreate({
	form,
	state,
	toggleState
}: {
	form: IForm | null
	state: boolean
	toggleState: any
}) {
	const router = useRouter()
	const [values, setValues] = useState<any>({
		id: generateUUID(),
		fields: form?.fields,
		formName: form?.name,
		formId: form?.id,
		createdAt: ""
	})
	const [message, setMessage] = useState<string>("")
	const [messageType, setMessageType] = useState<string>("")

	const handleChange = (name: string, value: any) => {
		setValues((prevValues: any) => ({ ...prevValues, [name]: value }))
		console.log("handleChange called !! ", values)
	}

	/* function handleFieldChange(fieldIndex: number, key: string, value: string | boolean) {
		setValues((prevValues: any) => ({
			...prevValues,
			fields: prevValues.fields.map((field, i) => {
				if (i === fieldIndex) {
					return { ...field, [key]: value }
				} else {
					return field
				}
			})
		}))
	} */

	function handleOnDeletField(index: number) {
		const deleteItemFromArray = (arr: any[], index: number): any[] => {
			arr.splice(index, 1)
			return arr
		}
		setValues((prevValues: any) => ({
			...prevValues,
			fields: deleteItemFromArray(prevValues.fields, index)
		}))
	}

	function addField() {
		setValues((prevValues: any) => ({
			...prevValues,
			fields: prevValues.fields.concat(getEmptyField())
		}))
	}

	function storeInLocalstorage(form: IForm) {
		const storedForms = localStorage.getItem("forms")
		let contentToBeStored = ``
		if (storedForms) {
			const parsedContent = JSON.parse(storedForms)
			contentToBeStored = JSON.stringify(parsedContent.concat(form))
		} else {
			contentToBeStored = JSON.stringify([form])
		}
		localStorage.setItem("forms", contentToBeStored)
	}

	function saveForm() {
		const [valid, errors, form] = validateForm({ ...values })
		if (!valid) {
			console.error(errors)
			setMessageType("error")
			setMessage(errors.join(", "))
		} else {
			storeInLocalstorage(form)
			setMessageType("success")
			setMessage("Form created Successfully.")
			router.reload()
		}
	}

	function handleClose() {}

	return (
		<Dialog open={state} onClose={(e) => toggleState(false)}>
			<DialogTitle>Subscribe</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To subscribe to this website, please enter your email address here. We will send
					updates occasionally.
				</DialogContentText>
				
			</DialogContent>
			<DialogActions>
				<Button onClick={(e) => toggleState(false)}>Cancel</Button>
				<Button onClick={toggleState}>Subscribe</Button>
			</DialogActions>
		</Dialog>
	)
}
