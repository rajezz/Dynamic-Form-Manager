import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

// Layouts...
import Layout from "layout/Layout"

import { IForm } from "types/Form"

// Library components...
import Button from "@mui/material/Button"

//Components...
import InputText from "components/InputText"
import MUIInputText from "components/MUIInputText"
import InputSelect from "components/InputSelect"
import InputDate from "components/InputDate"
import FieldListTable from "components/FieldListTable"
import SnackBar from "components/SnackBar"

// libraries...
import { getEmptyField, generateUUID, validateForm } from "lib/form-handler"

// Data...
import { CONTAINED, OUTLINED } from "_data/form-data"

export default function AdminFormCreate({
	currentForm,
	onCancel
}: {
	currentForm?: IForm
	onCancel: any
}) {
	const router = useRouter()
	const [form, setForm] = useState<IForm>({
		id: generateUUID(),
		name: "",
		validity: new Date().toString(),
		status: "",
		accessibleUser: "",
		fields: [],
		createdAt: "",
		updatedAt: ""
	})

	useEffect(() => {
		if (currentForm) {
			const formValues: any = JSON.parse(JSON.stringify(currentForm))

			setForm((prevValue) => {
				return formValues
			})
		}
	}, [])
	const [message, setMessage] = useState<string>("")
	const [isSuccessMessage, toggleMessageType] = useState<boolean>(false)

	const handleChange = (name: string, value: any) => {
		setForm((prevValues: any) => ({ ...prevValues, [name]: value }))
		console.log("handleChange called !! ", form)
	}

	function handleFieldChange(fieldIndex: number, key: string, value: string | boolean) {
		setForm((prevValues) => ({
			...prevValues,
			fields: prevValues.fields?.map((field, i) => {
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
		setForm((prevValues) => ({
			...prevValues,
			fields: deleteItemFromArray(prevValues.fields || [], index)
		}))
	}

	function addField() {
		setForm((prevValues) => ({
			...prevValues,
			fields: prevValues.fields?.concat(getEmptyField())
		}))
	}

	function storeInLocalstorage(form: IForm) {
		const storedForms = localStorage.getItem("forms")
		let contentToBeStored = ``
		if (storedForms) {
			const parsedContent = JSON.parse(storedForms)
			let isExist: boolean = false,
				index: number = -1
			
			parsedContent.forEach((storedForm: any, i: number) => {
				if (!isExist && storedForm.id === form.id) {
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
		localStorage.setItem("forms", contentToBeStored)
	}

	function saveForm() {
		const [valid, errors, updatedForm] = validateForm({ ...form })
		if (!valid) {
			console.error(errors)
			toggleMessageType(false)
			setMessage(errors.join(", "))
			setTimeout(function (e) {
				setMessage("")
			}, 6000)
		} else {
			storeInLocalstorage(updatedForm)
			toggleMessageType(true)
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
					value={form["name"]}
					label="Form name"
					name="name"
					required={true}
					type="TEXT"
				/>
				<InputDate
					id={2}
					handleChange={(e: any) => {
						console.log(e)
						handleChange("validity", e.target.value)
					}}
					value={form["validity"]}
					label="Validity"
					name="validity"
					required={true}
					type="DATE"
				/>
				<InputSelect
					id={3}
					handleChange={(e: any) => handleChange("status", e.value)}
					value={form["status"]}
					label="Form status"
					name="status"
					required={true}
					type="DROPDOWN"
					options={["Active", "Inactive"]}
				/>
			</div>
			<div className="row flex-start">
				<MUIInputText
					id={4}
					handleChange={(e: any) => handleChange("accessibleUser", e.currentTarget.value)}
					value={form["accessibleUser"]}
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
					form={form}
					handleChange={handleFieldChange}
					onDelete={handleOnDeletField}
				/>
				<div className="btn-panel">
					<Button variant={CONTAINED} onClick={saveForm}>
						Save Form
					</Button>
				</div>
				<SnackBar message={message} success={isSuccessMessage} />
			</div>
		</div>
	)
}
