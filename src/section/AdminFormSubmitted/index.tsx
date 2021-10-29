import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

// Layouts...
import Layout from "layout/Layout"
import SubmittedFormListTable from "components/SubmittedFormListTable"

// Library components...
import Button from "@mui/material/Button"
import { submittedFormTableColumns } from "_data/form-data"
import { ISubmittedForm } from "types/Form"

function formatForm(forms: any[]) {
	return forms.map((form) => ({
		submittedUser: form.submittedUser,
		formName: form.formName,
		formId: form.formId,
		createdAt: new Date(form.createdAt).toLocaleString(),
		id: form.id,
	}))
}

export default function AdminFormSubmitted() {
	const router = useRouter()
	const [submittedForms, setSubmittedForms] = useState<ISubmittedForm[]>([])
	useEffect(() => {
		const storedForms = localStorage.getItem("submittedForms")
		console.log("storedForms", storedForms)
		if (storedForms) {
			const parsedContent = JSON.parse(storedForms)
			console.log("parsedContent", parsedContent)
			setSubmittedForms(parsedContent)
		}
	}, [])

	function onDeleteClick(index: number) {
		const response = confirm("Are you sure of deleting the submitted form?")
		if (response) {
			const deleteItemFromArray = (arr: any[], index: number): any[] => {
				arr.splice(index, 1)
				return arr
			}
			setSubmittedForms((prevValues) => {
				const updatedList = deleteItemFromArray(prevValues, index)
				localStorage.setItem("submittedForms", JSON.stringify(updatedList))

				return updatedList
			})
			router.reload()
		}
	}

	function onEmailClick(index: number) {}
	function onDownloadClick(index: number) {}

	return (
		<div className="content-section form-list">
			<SubmittedFormListTable
				rows={formatForm(submittedForms)}
				columns={submittedFormTableColumns}
				onDeleteClick={onDeleteClick}
				onEmailClick={onEmailClick}
				onDownloadClick={onDownloadClick}
			/>
		</div>
	)
}
