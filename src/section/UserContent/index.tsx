import React, { useState, useEffect } from "react"

// Layouts...
import Layout from "layout/Layout"

// Components...
import UserFormList from "section/UserFormList"
import UserFormCreate from "section/UserFormCreate"

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

export default function UserContent({}: any) {
	const [page, setPage] = useState(FORM_LIST)

	function createPageContent() {
		switch (page) {
			case FORM_LIST:
				return <UserFormList />
			case FORM_CREATE:
				return <UserFormCreate />
			
		}
	}
	return (
		<div className="content-section">
			<div className="action-panel">
				<ButtonGroup aria-label="medium button group">
					{[FORM_LIST, FORM_CREATE].map((pageName) => (
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
