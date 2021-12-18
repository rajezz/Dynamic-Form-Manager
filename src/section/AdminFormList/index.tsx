import React, { useState, useEffect, useReducer, Reducer } from "react"
import { useRouter } from "next/router"

// Components...
import FormListTable from "components/FormListTable"

// Sections...
import AdminFormCreate from "section/AdminFormCreate"

// Library components...
import Button from "@mui/material/Button"

// lib...
import { reducer } from "lib/AdminFormReducer"
import { getFormById } from "lib/FormHandler"

// Data...
import {
	OUTLINED,
	FORM_LIST,
	FORM_CREATE,
	formTableColumns,
	REDUCER_ACTION_INSERT,
	REDUCER_ACTION_SELECT,
	REDUCER_ACTION_UNSELECT,
	getEmptyAdminFormState,
	getEmptyForm
} from "_data/constants"

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
	const [state, dispatch] = useReducer<Reducer<any, any>, any>(
		reducer,
		{ forms: [], selectedForm: getEmptyForm() },
		getEmptyAdminFormState
	)

	const [page, setPage] = useState<string>(FORM_LIST)
	const [actionBtnText, setActionBtnText] = useState<string>("Create Form")

	useEffect(() => {
		const storedForms = localStorage.getItem("forms")
		console.log("storedForms", storedForms)
		if (storedForms) {
			const parsedContent = JSON.parse(storedForms)
			console.log("parsedContent", parsedContent)
			dispatch({ type: REDUCER_ACTION_INSERT, forms: parsedContent })
		}
	}, [])

	function togglePage() {
		if (page === FORM_LIST) {
			setPage(FORM_CREATE)
			setActionBtnText("Cancel")
		} else {
			setPage(FORM_LIST)
			dispatch({ type: REDUCER_ACTION_UNSELECT })
			setActionBtnText("Create Form")
		}
	}

	function onUpdateClick(id: number) {
		const form = getFormById(state.forms, id)

		if (form) {
			dispatch({
				type: REDUCER_ACTION_SELECT,
				form
			})
			togglePage()
		}
	}

	function switchPage() {
		setPage(FORM_LIST)
		dispatch({ type: REDUCER_ACTION_UNSELECT })
	}

	function createPageContent() {
		switch (page) {
			case FORM_LIST:
				return (
					<FormListTable
						rows={formatForm(state.forms)}
						columns={formTableColumns}
						dispatch={dispatch}
						onUpdateClick={onUpdateClick}
					/>
				)
			case FORM_CREATE:
				return (
					<AdminFormCreate
						form={state.selectedForm}
						dispatch={dispatch}
						onSave={switchPage}
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
