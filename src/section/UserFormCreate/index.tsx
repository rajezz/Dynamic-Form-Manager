import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

// Layouts...
import Layout from "layout/Layout"

import { IForm } from "types/Form"

// Library components...
import Button from "@mui/material/Button"

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

export default function UserFormCreate() {
	const router = useRouter()
	const [values, setValues] = useState<IForm>({
		id: generateUUID(),
		name: "",
		validity: new Date().toString(),
		status: "",
		accessibleUser: "",
		fields: [],
		createdAt: ""
	})
	const [message, setMessage] = useState<string>("")
	const [messageType, setMessageType] = useState<string>("")

	const handleChange = (name: string, value: any) => {
		setValues((prevValues: any) => ({ ...prevValues, [name]: value }))
		console.log("handleChange called !! ", values)
	}

	function handleFieldChange(fieldIndex: number, key: string, value: string | boolean) {
		setValues((prevValues) => ({
			...prevValues,
			fields: prevValues.fields.map((field, i) => {
				if (i === fieldIndex) {
					return { ...field, [key]: value }
				} else {
					return field
				}
			})
		}))
	}

	function handleOnDeletField(index: number) {
		const deleteItemFromArray = (arr: any[], index: number): any[] => {
			arr.splice(index, 1)
			return arr
		}
		setValues((prevValues) => ({
			...prevValues,
			fields: deleteItemFromArray(prevValues.fields, index)
		}))
	}

	function addField() {
		setValues((prevValues) => ({
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

	return (
		<div className="content-section form-create">
			<div className="row">
				<InputText
					id={1}
					handleChange={(e: any) => handleChange("name", e.currentTarget.value)}
					value={values["name"]}
					label="Form name"
					name="name"
					required={true}
					type="TEXT"
				/>
				<InputDate
					id={2}
					handleChange={(e: any) => {
						console.log(e)
						handleChange("validity", e)
					}}
					value={values["validity"]}
					label="Validity"
					name="validity"
					required={true}
					type="DATE"
				/>
				<InputSelect
					id={3}
					handleChange={(e: any) => handleChange("status", e.value)}
					value={values["status"]}
					label="Form status"
					name="status"
					required={true}
					type="DROPDOWN"
					options={["Active", "Inactive"]}
				/>
			</div>
			<div className="row flex-start">
				<InputText
					id={4}
					handleChange={(e: any) => handleChange("accessibleUser", e.currentTarget.value)}
					value={values["accessibleUser"]}
					label="Accessible User"
					name="accessibleUser"
					required={true}
					type="PARAGRAPH"
				/>
			</div>
			<div className="field-list-panel">
				<div className="btn-panel">
					<Button variant={OUTLINED} onClick={addField}>
						Add Field
					</Button>
				</div>
				<FieldListTable
					form={values}
					handleChange={handleFieldChange}
					onDelete={handleOnDeletField}
				/>
				<div className="btn-panel">
					<Button variant={CONTAINED} onClick={saveForm}>
						Save Form
					</Button>
				</div>
				<SnackBar message={message} type={messageType} />
			</div>
		</div>
	)
}
