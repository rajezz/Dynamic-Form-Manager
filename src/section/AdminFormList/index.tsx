import React, { useState, useEffect } from "react"

// Layouts...
import Layout from "layout/Layout"
import DataTable from "components/DynamicTable"

// Library components...
import Button from "@mui/material/Button"
import { formTableColumns } from "_data/form-data"
import { IForm } from "types/Form"

function formatForm(forms: any[]) {
	return forms.map((form) => ({
		name: form.name,
		id: form.id,
		fields: form.fields.map((field: any) => field.label).join("\n"),
		status: form.status,
		validity: new Date(form.validity).toLocaleDateString(),
		accessibleUser: form.accessibleUser.replaceAll(",", "\n"),
		createdAt: new Date(form.createdAt).toLocaleDateString()
	}))
}

export default function AdminFormList() {
	const [forms, setForms] = useState<IForm[]>([])
	useEffect(() => {
		const storedForms = localStorage.getItem("forms")
		console.log("storedForms", storedForms)
		if (storedForms) {
			const parsedContent = JSON.parse(storedForms)
			console.log("parsedContent", parsedContent)
			setForms(parsedContent)
		}
	}, [])
	return (
		<div className="content-section form-list">
			<DataTable rows={formatForm(forms)} columns={formTableColumns} />
		</div>
	)
}
