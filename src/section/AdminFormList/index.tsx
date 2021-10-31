import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

// Components...
import FormListTable from "components/FormListTable"

// Sections...
import AdminFormCreate from "section/AdminFormCreate"

// Library components...
import Button from "@mui/material/Button"
import { IForm } from "types/Form"
// Data...
import { OUTLINED, FORM_LIST, FORM_CREATE, formTableColumns } from "_data/form-data"

function formatForm(forms: any[]) {
	return forms.map((form) => ({
		name: form.name,
		id: form.id,
		fields: form.fields.map((field: any) => field.label).join("\n"),
		status: form.status,
		validity: new Date(form.validity).toLocaleDateString(),
		accessibleUser: form.accessibleUser.replaceAll(",", "\n"),
		createdAt: form.createdAt ? new Date(form.createdAt).toLocaleString() : "N/A",
		updatedAt: form.updatedAt ? new Date(form.updatedAt).toLocaleString() : "N/A"
	}))
}

export default function AdminFormList() {
	const router = useRouter()
	const [forms, setForms] = useState<IForm[]>([])
	const [selectedForm, setSelectedForm] = useState<IForm>()
	const [page, setPage] = useState<string>(FORM_LIST)
	const [actionBtnText, setActionBtnText] = useState<string>("Create Form")

	useEffect(() => {
		const storedForms = localStorage.getItem("forms")
		console.log("storedForms", storedForms)
		if (storedForms) {
			const parsedContent = JSON.parse(storedForms)
			console.log("parsedContent", parsedContent)
			setForms(parsedContent)
		}
	}, [])

	function onDelete(index: number) {
		const response = confirm("Are you sure of deleting the form?")
		if (response) {
			const deleteItemFromArray = (arr: any[], index: number): any[] => {
				arr.splice(index, 1)
				return arr
			}
			setForms((prevValues) => {
				const updatedList = deleteItemFromArray(prevValues, index)
				localStorage.setItem("forms", JSON.stringify(updatedList))

				return updatedList
			})
			router.reload()
		}
	}

	function openUpdateFormPage(index: number) {
		const currentForm = forms[index]
		setSelectedForm(currentForm)
		setPage(FORM_CREATE)
		setActionBtnText("Cancel")
	}
	function togglePage() {
		if (page === FORM_LIST) {
			setPage(FORM_CREATE)
			setActionBtnText("Cancel")
		} else {
			setPage(FORM_LIST)
			setActionBtnText("Create Form")
		}
	}

	function createPageContent() {
		switch (page) {
			case FORM_LIST:
				return (
					<FormListTable
						rows={formatForm(forms)}
						columns={formTableColumns}
						onUpdate={openUpdateFormPage}
						onDelete={onDelete}
					/>
				)
			case FORM_CREATE:
				return (
					<AdminFormCreate
						currentForm={selectedForm}
						onCancel={() => setPage(FORM_LIST)}
					/>
				)
		}
	}

	return (
		<div className="content-section form-list">
			<div className="btn-panel">
				<Button variant={OUTLINED} onClick={togglePage}>
					{actionBtnText}
				</Button>
			</div>
			{createPageContent()}
		</div>
	)
}
