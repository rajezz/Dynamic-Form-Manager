import React, { useState, useEffect } from "react"

// Layouts...
import Layout from "layout/Layout"

// Components...
import AdminFormList from "section/AdminFormList"
import AdminFormCreate from "section/AdminFormCreate"
import AdminFormSubmitted from "section/AdminFormSubmitted"

// Library components...
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"

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

export default function Content({}: any) {
	const [page, setPage] = useState(FORM_LIST)
	const [forms, setForms] = useState<Array<IForm>>([])

	function getLocalData(key: string, defaulValue: string): string {
		const localStore: any = localStorage
		return localStore.getItem(key) ? localStore.getItem(key) : defaulValue
	}
	useEffect(() => {
		const formStr: string = getLocalData("forms", "[]")

		setForms((prevValue) => [prevValue, ...JSON.parse(formStr)])
	}, [])

	function createPageContent() {
		switch (page) {
			case FORM_LIST:
				return <AdminFormList />
			case FORM_CREATE:
				return <AdminFormCreate />
			case FORM_SUBMITTED:
				return <AdminFormSubmitted />
		}
	}
	return (
		<div className="content-section">
			<div className="action-panel">
				<ButtonGroup aria-label="medium button group">
					{[FORM_LIST, FORM_CREATE, FORM_SUBMITTED].map((pageName) => (
						<Button
							variant={page === pageName ? CONTAINED : OUTLINED}
							onClick={() => setPage(pageName)}>
							{`${nameLabelMap[pageName]}`}
						</Button>
					))}
				</ButtonGroup>
			</div>
			{createPageContent()}
		</div>
	)
}
