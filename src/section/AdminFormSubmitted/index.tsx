import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

// Layouts...
import Layout from "layout/Layout"
import SubmittedFormListTable from "components/SubmittedFormListTable"
import InputDialog from "components/InputDialog"

// Library components...
import Button from "@mui/material/Button"
import { submittedFormTableColumns } from "_data/form-data"
import { ISubmittedForm } from "types/Form"
import { sendMail, downloadPDF } from "lib/form-handler"

function formatForm(forms: any[]) {
	return forms.map((form) => ({
		submittedUser: form.submittedUser,
		formName: form.formName,
		formId: form.formId,
		createdAt: form.createdAt ? new Date(form.createdAt).toLocaleString() : "N/A",
		updatedAt: form.updatedAt ? new Date(form.updatedAt)?.toLocaleString() : "N/A",
		id: form.id
	}))
}

const getFormById = (forms: any[], id: number) => forms.filter((form) => form.id === id)[0]

export default function AdminFormSubmitted() {
	const router = useRouter()
	const [submittedForms, setSubmittedForms] = useState<ISubmittedForm[]>([])

	const [selectedId, setSelectedId] = useState<number>(-1)
	const [dialogState, setDialogState] = useState<boolean>(false)

	useEffect(() => {
		const storedForms = localStorage.getItem("submittedForms")
		console.log("storedForms", storedForms)
		if (storedForms) {
			const parsedContent = JSON.parse(storedForms)
			console.log("parsedContent", parsedContent)
			setSubmittedForms(parsedContent)
		}
	}, [])

	function onDeleteClick(id: number) {
		const response = confirm("Are you sure of deleting the submitted form?")
		if (response) {
			const deleteItemFromArray = (arr: any[], i: number): any[] => {
				arr.splice(i, 1)
				return arr
			}
			setSubmittedForms((prevValues) => {
				const index = submittedForms.findIndex((form: ISubmittedForm) => form.id === id)

				const updatedList = deleteItemFromArray(prevValues, index)
				localStorage.setItem("submittedForms", JSON.stringify(updatedList))

				return updatedList
			})
			router.reload()
		}
	}

	async function onEmailClick(id: number) {
		setSelectedId(id)
		setDialogState(true)
	}
	async function onDownloadClick(id: number) {
		try {
			const currentForm = submittedForms[id]
			const response = await downloadPDF({...currentForm})
		} catch (error) {
			console.error("error >> ", error)
		}
	}

	function onDialogClose() {
		setDialogState(false)
	}
	async function onDialogSubmit(email: string) {
		try {
			const currentForm = getFormById(submittedForms, selectedId)
			if (currentForm) {
				const response = await sendMail({
					to: email,
					...currentForm
				})
				onDialogClose()
			}
		} catch (error) {
			console.error("error >> ", error)
		}
	}

	return (
		<div className="content-section form-list">
			<SubmittedFormListTable
				rows={formatForm(submittedForms)}
				columns={submittedFormTableColumns}
				onDeleteClick={onDeleteClick}
				onEmailClick={onEmailClick}
				onDownloadClick={onDownloadClick}
			/>
			<InputDialog open={dialogState} onClose={onDialogClose} onSubmit={onDialogSubmit} />
		</div>
	)
}
