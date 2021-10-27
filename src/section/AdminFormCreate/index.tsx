import React, { useState, useEffect } from "react"

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

function getEmptyField() {
	return {
		name: "",
		value: "",
		label: "",
		type: "",
		required: false,
		public: false,
		printable: false
	}
}

export default function AdminFormCreate() {
	const [values, setValues] = useState<IForm>({
		name: "",
		validity: "",
		status: "active",
		accessibleUser: "",
		fields: [],
		createdAt: "",
		updatedAt: ""
	})

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

	return (
		<div className="content-section form-create">
			<div className="row">
				<InputText
					handleChange={(e: any) => handleChange("name", e.currentTarget.value)}
					value={values["name"]}
					label="Form name"
					name="name"
					required={true}
					type="TEXT"
				/>
				<InputDate
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
					<Button variant="outlined" onClick={addField}>
						Add Field
					</Button>
				</div>
				<FieldListTable
					form={values}
					handleChange={handleFieldChange}
					onDelete={handleOnDeletField}
				/>
			</div>
		</div>
	)
}
