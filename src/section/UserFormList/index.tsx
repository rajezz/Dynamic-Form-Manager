import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

// Layouts...
import Layout from "layout/Layout"
import UserFormListTable from "components/UserFormListTable"
import UserFormCreate from "section/UserFormCreate"

// Library components...
import Button from "@mui/material/Button"
import { formTableColumns } from "_data/form-data"
import { IForm } from "types/Form"

function formatForm(forms: any[]) {
	return forms.map((form) => ({
		name: form.name,
		createdAt: new Date(form.createdAt).toLocaleDateString()
	}))
}

export default function UserFormList() {
	const router = useRouter()
	const [forms, setForms] = useState<IForm[]>([])
	const [selectedForm, setSelectedForm] = useState<IForm | null>(null)
	const [modalState, setModalState] = useState<boolean>(false)

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

	function onCreate(index: number) {}
	function onDownload(index: number) {}
	function onEmail(index: number) {}

	return (
		<div className="content-section form-list">
			<UserFormListTable
				rows={formatForm(forms)}
				columns={formTableColumns}
				onCreate={onCreate}
				onDownload={onDownload}
				onEmail={onEmail}
			/>
			<UserFormCreate state={modalState} form={selectedForm} toggleState={setModalState} />
		</div>
	)
}
