import React, { useState, useEffect } from "react"

// Layouts...
import Layout from "layout/Layout"

// Components...
import AdminFormList from "section/AdminFormList"
import AdminFormCreate from "section/AdminFormCreate"
import AdminFormSubmitted from "section/AdminFormSubmitted"

// Library components...
import Button from "@mui/material/Button"

// Types...
import { IForm } from "types/Form"

export default function Content({}: any) {
	const [page, setPage] = useState("form-list")
	const [contextBtnText, setContextBtnText] = useState("Submitted form")
	const [forms, setForms] = useState<Array<IForm>>([])

	function getLocalData(key: string, defaulValue: string): string {
		const localStore: any = localStorage
		return localStore.getItem(key) ? localStore.getItem(key) : defaulValue
	}
	useEffect(() => {
		const formStr: string = getLocalData("forms", "[]")

		setForms((prevValue) => [prevValue, ...JSON.parse(formStr)])
	}, [])

	function openCreateForm() {
		if (page === "form-list") setPage("form-create")
	}
	function openResultForm() {
		if (page === "form-list") {
			setPage("form-submitted")
			setContextBtnText("Form list")
		} else if (page === "form-submitted") {
			setPage("form-list")
			setContextBtnText("Submitted form")
		}
	}

	function createPageContent() {
		switch (page) {
			case "form-list":
				return <AdminFormList />
			case "form-create":
				return <AdminFormCreate />
			case "form-submitted":
				return <AdminFormSubmitted />
		}
	}
	return (
		<div className="content-section">
			<div className="action-panel">
				<Button variant="outlined" onClick={openCreateForm}>
					Create New Form
				</Button>
				<Button variant="outlined" onClick={openResultForm}>
					{contextBtnText}
				</Button>
			</div>
			{createPageContent()}
		</div>
	)
}
