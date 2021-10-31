import React, { useState, useEffect, Fragment } from "react"

// Layouts...
import Layout from "layout/Layout"

// Components...
import UserFormCreate from "section/UserFormCreate"
import UserFormListTable from "components/UserFormListTable"
import InputDialog from "components/InputDialog"

// Library components...
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import { UserContext } from "section/UserContext"

// Data...
import { userFormTableColumns } from "_data/form-data"

function formatForm(forms: any[]) {
	return forms.map((form) => ({
		formName: form.name,
		formId: form.id,
		createdAt: new Date(form.createdAt).toLocaleDateString(),
		updatedAt: form.updatedAt ? new Date(form.updatedAt).toLocaleDateString() : "N/A"
	}))
}

// Types...
import { IForm } from "types/Form"

// Data...
import {
	CONTAINED,
	OUTLINED,
	FORM_LIST,
	FORM_CREATE,
	FORM_SUBMITTED,
	nameLabelMap
} from "_data/form-data"
import { sendMail, downloadPDF } from "lib/form-handler"

function getSubmittedForm(id: number, submittedForms: any[], email: string) {
	const index = submittedForms.findIndex(
		(form) => form.formId === id && form.submittedUser === email
	)
	return index > -1 ? submittedForms[index] : null
}

function filterRequiredForms(forms: any, userEmail: string) {
	return forms.filter((form: any) => {
		const validity = new Date(form.validity)
		const today = new Date()
		const diff = validity.getTime() - today.getTime()
		const splits = form.accessibleUser.split(",")
		return (
			form.status === "Active" &&
			diff > 0 &&
			splits.some((split: any) => userEmail === split.trim())
		)
	})
}
function filterPublicFields(forms: any) {
	let filteredForms: any[] = []
	forms.forEach((form: any) => {
		const fields = form.fields.filter((field: any) => field.public)
		filteredForms.push({ ...form, fields })
	})
	return filteredForms
}

const getFormById = (forms: any[], id: number) => forms.filter((form) => form.id === id)[0]

export default function UserContent({ email }: { email: string }) {
	const [page, setPage] = useState(FORM_LIST)
	const [forms, setForms] = useState<IForm[]>([])
	const [selectedForm, setSelectedForm] = useState<any>()

	const [selectedId, setSelectedId] = useState<number>(-1)
	const [dialogState, setDialogState] = useState<boolean>(false)

	useEffect(() => {
		const storedForms = localStorage.getItem("forms")
		const storedSubmittedForms = localStorage.getItem("submittedForms")

		console.log("storedForms", storedForms)
		if (storedForms) {
			const parsedFormContent = JSON.parse(storedForms)

			let filteredForms = filterPublicFields(filterRequiredForms(parsedFormContent, email))
			const parsedSubmittedFormContent = storedSubmittedForms
				? JSON.parse(storedSubmittedForms)
				: []
			console.log("parsedSubmittedFormContent", parsedSubmittedFormContent)

			filteredForms.forEach((form: any) => {
				const submittedForm = getSubmittedForm(form.id, parsedSubmittedFormContent, email)
				if (submittedForm) {
					form.fields = submittedForm.fields
					form.createdAt = submittedForm.createdAt
					form.updatedAt = submittedForm.updatedAt
				}
			})
			console.log("parsedFormContent", filteredForms)
			setForms(filteredForms)
		}
	}, [])

	function onCreate(index: number) {
		setSelectedForm(forms[index])
		setPage(FORM_CREATE)
	}
	async function onDownload(index: number) {
		try {
			const currentForm = forms[index]
			const response = await downloadPDF({
				submittedUser: email,
				formName: currentForm.name,
				createdAt: currentForm.createdAt,
				updatedAt: currentForm.updatedAt,
				fields: currentForm.fields
			})
		} catch (error) {
			console.error("error >> ", error)
		}
	}

	async function onEmail(index: number) {
		setSelectedId(index)
		setDialogState(true)
	}
	function onDialogClose() {
		setDialogState(false)
	}
	async function onDialogSubmit(providedEmail: string) {
		try {
			const currentForm = forms[selectedId]
			if (currentForm) {
				const response = await sendMail({
					to: providedEmail,
					submittedUser: email,
					formName: currentForm.name,
					createdAt: currentForm.createdAt,
					updatedAt: currentForm.updatedAt,
					fields: currentForm.fields
				})
				onDialogClose()
			}
		} catch (error) {
			console.error("error >> ", error)
		}
	}
	/* 
	async function onEmail(index: number) {
		try {
			const currentForm = forms[index]
			const response = await sendMail({
				to: email,
				submittedUser: email,
				formName: currentForm.name,
				createdAt: currentForm.createdAt,
				updatedAt: currentForm.updatedAt,
				fields: currentForm.fields
			})
		} catch (error) {
			console.error("error >> ", error)
		}
	} */
	function onCancel() {
		setPage(FORM_LIST)
	}

	function createPageContent() {
		switch (page) {
			case FORM_LIST:
				return (
					<Fragment>
						<UserFormListTable
							rows={formatForm(forms)}
							columns={userFormTableColumns}
							onCreate={onCreate}
							onDownload={onDownload}
							onEmail={onEmail}
						/>
						<InputDialog
							open={dialogState}
							onClose={onDialogClose}
							onSubmit={onDialogSubmit}
						/>
					</Fragment>
				)
			case FORM_CREATE:
				return <UserFormCreate form={selectedForm} onCancel={onCancel} email={email} />
		}
	}
	return <div className="content-section">{createPageContent()}</div>
}
