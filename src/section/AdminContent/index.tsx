import React, { useState, useEffect } from "react"

// Layouts...
import Layout from "layout/Layout"

// Components...
import AdminFormList from "section/AdminFormList"
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
	FORM_SUBMITTED,
	nameLabelMap
} from "_data/constants"

export default function AdminContent({}: any) {
	const [page, setPage] = useState(FORM_LIST)

	function createPageContent() {
		switch (page) {
			case FORM_LIST:
				return <AdminFormList />
			case FORM_SUBMITTED:
				return <AdminFormSubmitted />
		}
	}
	return (
		<div className="content-section">
			<div className="action-panel">
				<ButtonGroup aria-label="medium button group">
					{[FORM_LIST, FORM_SUBMITTED].map((pageName) => (
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
