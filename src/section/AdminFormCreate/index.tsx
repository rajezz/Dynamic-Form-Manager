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
import { validateForm } from "lib/FormHandler"

// Data...
import {
	CONTAINED,
	OUTLINED,
	REDUCER_ACTION_UPDATE_FORM,
	REDUCER_ACTION_UPDATE,
	REDUCER_ACTION_INSERT_FIELD
} from "_data/constants"

export default function AdminFormCreate({
	form,
	dispatch,
	onSave
}: {
	form: IForm
	dispatch: any
	onSave: any
}) {
	const router = useRouter()

	const [message, setMessage] = useState<string>("")
	const [isSuccessMessage, toggleMessageType] = useState<boolean>(false)

	const handleChange = (id: number, values: any) => {
		dispatch({
			type: REDUCER_ACTION_UPDATE_FORM,
			id,
			values
		})
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
		dispatch({ type: REDUCER_ACTION_UPDATE, form })
	}

	function saveForm() {
		const [valid, errors, updatedForm] = validateForm(form)
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
			onSave()
		}
	}

	return (
		<div className="content-section form-create">
			<div className="row">
				<InputText
					id={1}
					handleChange={(e: any) =>
						handleChange(form.id, { name: e.currentTarget.value })
					}
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
						handleChange(form.id, { validity: e.target.value })
					}}
					value={form["validity"]}
					label="Validity"
					name="validity"
					required={true}
					type="DATE"
				/>
				<InputSelect
					id={3}
					handleChange={(e: any) => handleChange(form.id, { status: e.value })}
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
					handleChange={(e: any) =>
						handleChange(form.id, { accessibleUser: e.currentTarget.value })
					}
					value={form["accessibleUser"]}
					label="Accessible User"
					name="accessibleUser"
					required={true}
					type="PARAGRAPH"
				/>
			</div>
			<div className="field-list-panel">
				<div className="btn-panel">
					<Button
						variant={OUTLINED}
						onClick={() =>
							dispatch({
								type: REDUCER_ACTION_INSERT_FIELD
							})
						}
					>
						Add Field
					</Button>
				</div>
				<FieldListTable form={form} dispatch={dispatch} />
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
